import mongoose from "mongoose";
import Order from "../../_backend/models/Order";
import Product from "../../_backend/models/Product";
import { User } from "../../_backend/models/Users";
import { createHttpError } from "../utils/helpers";

async function addOrder(cart) {
  if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
    throw createHttpError("Panier vide", 400);
  }

  const user = await User.findById(cart.id);

  if (!user) {
    throw createHttpError("Utilisateur introuvable", 404);
  }

  const aggregated = {}; // exemple : { "<productId>|<color>|<size>": totalQuantity }

  for (const line of cart.products) {
    const { id, color, size, quantity } = line;

    if (!id || !color || !size || !Number.isInteger(quantity) || quantity <= 0) {
      throw createHttpError(" Données invalides dans le panier", 400);
    }

    const key = `${id}|${color}|${size}`; // unique key for product/color/size to accumulate quantity
    aggregated[key] = (aggregated[key] || 0) + quantity; // accumulate quantities for identical keys
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Extract unique product IDs from aggregated keys
    const productIds = Array.from(new Set(Object.keys(aggregated).map((k) => k.split("|")[0])));

    // Fetch all products in this order in current session
    const productsInDb = await Product.find({ _id: { $in: productIds } }).session(session);

    // Create a Map for fast access by product ID
    const productMap = new Map(productsInDb.map((p) => [p._id.toString(), p]));

    // Verify stock availability for each aggregated product/color/size combination
    for (const [key, totalQuantity] of Object.entries(aggregated)) {
      const [productId, color, size] = key.split("|");
      const prod = productMap.get(productId);

      if (!prod) {
        throw createHttpError(`${prod.title} n'existe plus`, 404);
      }
      if (!prod.stock) {
        throw createHttpError(`"${prod.title} n'est plus proposé à la vente"`, 404);
      }
      const colorObj = prod.colors.find((c) => c.color === color);
      if (!colorObj) {
        throw createHttpError(`Couleur ${color} n'existe pas pour le produit ${prod.title}`, 404);
      }

      const sizeObj = colorObj.sizes.find((s) => s.size === size);
      if (!sizeObj || sizeObj.quantity < totalQuantity) {
        throw createHttpError(` Stock insuffisant pour ${prod.title || productId} (${color}/${size})`, 409);
      }
    }
    const enrichedProducts = cart.products.map((line) => {
      const prodDb = productMap.get(line.id);
      return {
        product: prodDb._id,
        price: prodDb.isOnSale ? prodDb.salePrice : prodDb.regularPrice,
        color: line.color,
        size: line.size,
        quantity: line.quantity,
      };
    });
    const order = new Order({
      products: enrichedProducts,
      user: user._id,
      email: user.email,
      total: cart.total,
      billingAddress: cart.billingAddress || user.address,
      shippingAddress: user.address,
      statusHistory: [{ status: "payée", startDate: new Date() }],
    });

    const savedOrder = await order.save({ session });

    // decrement stock quantities line by line
    for (const [key, totalQuantity] of Object.entries(aggregated)) {
      const [productId, color, size] = key.split("|");

      // Use $elemMatch in query to decrement quantity for matching color and size with sufficient stock in the transaction.
      const updateResult = await Product.findOneAndUpdate(
        {
          _id: productId,
          colors: {
            $elemMatch: {
              color: color,
              sizes: {
                $elemMatch: {
                  size: size,
                  quantity: { $gte: totalQuantity },
                },
              },
            },
          },
        },

        {
          $inc: { "colors.$[c].sizes.$[s].quantity": -totalQuantity },
        },
        {
          new: true,
          arrayFilters: [{ "c.color": color }, { "s.size": size }],
          session,
        }
      );

      if (!updateResult) {
        throw createHttpError(`Stock insuffisant ou produit introuvable pour ${updateResult.title}`, 409);
      }
      /********** Concurrency check start ********/
      const colorObj = updateResult.colors.find((c) => c.color === color);
      const sizeObj = colorObj?.sizes.find((s) => s.size === size);

      if (!sizeObj) {
        throw createHttpError(
          `Erreur interne lors de la lecture de la taille après mise à jour du produit ${updateResult.title}`,
          500
        );
      }
      if (typeof sizeObj.quantity !== "number" || sizeObj.quantity < 0) {
        throw createHttpError(
          `Stock incohérent après mise à jour pour la taille ${size} du produit ${updateResult.title}`,
          500
        );
      }

      /********** Concurrency check end **********/

      // If quantity is 0 or less, mark product as out of stock
      if (sizeObj.quantity <= 0 && updateResult.stock !== false) {
        await Product.findByIdAndUpdate(productId, { $set: { stock: false } }, { session });
      }
    }

    // Commit transaction
    await session.commitTransaction();

    return savedOrder;
  } catch (err) {
    /*********  Do NOT hide the original err *******************/
    try {
      await session.abortTransaction();
    } catch (e) {
      console.error("Erreur lors de la annulation de la transaction :", e);
    }

    /********* End: Do NOT hide the original err *******/

    if (err && typeof err.statusCode === "number") {
      throw err;
    }

    throw createHttpError(
      (err && err.message) || "Une erreur est survenue lors de la création de la commande",
      (err && err.statusCode) || 500
    );
  } finally {
    await session.endSession();
  }
}
async function showOrderForUser(email) {
  if (!email) {
    throw createHttpError("Une adresse mail est requise", 404);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError("Utilisateur introuvable", 404);
  }

  const orders = await Order.find({ email }).populate("products.product").sort({ createdAt: -1 });

  return orders;
}

async function validateOrderShipping(validateShipping) {
  const { email, orderId } = validateShipping;
  if (!email || !orderId) {
    throw createHttpError("email et orderId sont requis", 404);
  }

  const order = await Order.findById(orderId);

  if (!order || order.email !== email) {
    throw createHttpError("Commande introuvable", 404);
  }

  if (order.status === "payée") {
    throw createHttpError("La commande n'a pas encore été expédiée", 400);
  }

  if (order.status === "reçue") {
    throw createHttpError("Vous avez deja validé cette commande", 400);
  }

  order.status = "reçue";
  order.statusHistory.push({ status: "reçue", startDate: new Date() });
  const updatedOrder = await order.save();

  if (!updatedOrder) {
    throw createHttpError("Erreur lors de la mise à jour de la commande", 500);
  }

  return updatedOrder;
}

/*************** Start Admin Functions  **************/
async function getAllOrdersForAdmin(idAdmin, page = 1, filters = {}) {
  if (!idAdmin) {
    throw createHttpError("idAdmin est requis", 404);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }

  const limit = 5;
  const skip = (page - 1) * limit;
  const query = {};

  if (Array.isArray(filters.status) && filters.status.length > 0) {
    query.status = { $in: filters.status };
  }

  const totalOrders = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalOrders / limit);
  const orders = await Order.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

  return {
    orders,
    pagination: {
      totalOrders,
      totalPages,
      currentPage: page,
    },
  };
}

/*************** End Admin Functions  **************/

export { addOrder, getAllOrdersForAdmin, showOrderForUser, validateOrderShipping };
