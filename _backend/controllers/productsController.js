import Product from "../../_backend/models/Product";
import { User } from "../../_backend/models/Users";
import { createHttpError, validateObjectId, deletePictures } from "../../_backend/utils/helpers";

async function getAllProductsForUser(page = 1, filters = {}) {
  const limit = 50;
  const skip = (page - 1) * limit;

  const query = {};
  query.stock = { $ne: false };
  // catégories
  if (Array.isArray(filters.categories) && filters.categories.length > 0) {
    query.category = { $in: filters.categories };
  }

  // prix
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.regularPrice = {};
    if (typeof filters.minPrice === "number") {
      query.regularPrice.$gte = filters.minPrice;
    }
    if (typeof filters.maxPrice === "number") {
      query.regularPrice.$lte = filters.maxPrice;
    }

    if (Object.keys(query.regularPrice).length === 0) {
      delete query.regularPrice;
    }
  }

  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);
  const products = await Product.find(query).skip(skip).limit(limit);

  return {
    products,
    pagination: {
      totalProducts,
      totalPages,
      currentPage: page,
    },
  };
}

async function addProductToFavorites(dataFavorites) {
  const { userId, productId } = dataFavorites;
  if (!userId || !productId) throw createHttpError("Veuillez fournir les deux ids de l'utilisateur et du produit", 400);

  validateObjectId(userId);
  validateObjectId(productId);

  const user = await User.findById(userId);
  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  if (userId !== user._id.toString())
    throw createHttpError("Vous devez vous connecter pour ajouter un produit aux favoris", 400);

  const product = await Product.findById(productId);
  if (!product) throw createHttpError("Produit introuvable", 404);

  if (user.favoritesProduct.includes(productId)) throw createHttpError("Le produit est déja dans vos favoris", 400);

  user.favoritesProduct.push(productId);
  const result = await user.save();

  if (!result) throw createHttpError("Une erreur est survenue lors de l'ajout du produit aux favoris", 500);

  return result;
}
async function removeProductFromFavorites(dataFavorites) {
  const { userId, productId } = dataFavorites;
  if (!userId || !productId) throw createHttpError("Veuillez fournir les deux ids de l'utilisateur et du produit", 400);

  validateObjectId(userId);
  validateObjectId(productId);

  const user = await User.findById(userId);
  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  if (userId !== user._id.toString())
    throw createHttpError("Vous devez vous connecter pour supprimer un produit favoris", 400);

  const product = await Product.findById(productId);
  if (!product) throw createHttpError("Produit introuvable", 404);

  if (!user.favoritesProduct.includes(productId)) throw createHttpError("Le produit n'est pas dans vos favoris", 400);

  user.favoritesProduct = user.favoritesProduct.filter((id) => id.toString() !== productId);
  const result = await user.save();

  if (!result) throw createHttpError("Une erreur est survenue lors de la suppression du produit aux favoris", 500);

  return result;
}

async function getFavoritesProducts(userId) {
  if (!userId) throw createHttpError("Veuillez fournir l'id de l'utilisateur", 400);

  validateObjectId(userId);

  const user = await User.findById(userId);
  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  if (userId !== user._id.toString()) throw createHttpError("Vous devez vous connecter pour voir vos favoris", 400);

  const favoritesProductsIds = user.favoritesProduct;

  const products = await Product.find({ _id: { $in: favoritesProductsIds } });

  return products;
}

async function getProductById(id) {
  const product = await Product.findById(id);
  if (!product) throw createHttpError("Produit introuvable", 404);
  return product;
}
async function getAllProductsForAdmin(idAdmin, limitProducts = 50, page = 1, queryProducts = {}) {
  if (!idAdmin) {
    throw createHttpError("idAdmin est requis", 400);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }

  const limit = limitProducts;
  const skip = (page - 1) * limit;
  const query = queryProducts;

  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);
  const products = await Product.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

  return {
    products,
    pagination: {
      totalProducts: totalProducts,
      totalPages,
      currentPage: page,
    },
  };
}
async function updateProductByAdmin(idAdmin, productId, updates) {
  if (!idAdmin) {
    throw createHttpError("idAdmin est requis", 400);
  }

  if (!productId) {
    throw createHttpError("productId est requis", 400);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }
  const updateFields = {};
  const simpleFields = [
    "title",
    "category",
    "stock",
    "regularPrice",
    "salePrice",
    "isLimitedEdition",
    "isNewCollection",
    "isOnSale",
    "isTopSeller",
    "colors",
  ];

  for (const key of simpleFields) {
    if (updates[key] !== undefined) {
      if (key === "regularPrice" || key === "salePrice") {
        const value = Number(updates[key]);
        if (isNaN(value)) {
          throw createHttpError(`Le champ ${key} doit être un nombre`, 400);
        }
        if (value < 0) {
          throw createHttpError(`Le prix ${key} ne peut pas être négatif`, 400);
        }
        updateFields[key] = value;
      } else {
        updateFields[key] = updates[key];
      }
    }
  }

  for (const key in updates) {
    if (key.includes(".")) {
      updateFields[key] = updates[key];
    }
  }

  if (Object.keys(updateFields).length === 0) {
    throw createHttpError("Aucun champ valide à mettre à jour", 400);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) throw createHttpError("Produit introuvable", 404);

  return updatedProduct;
}
async function deleteProductByAdmin(idAdmin, productId) {
  if (!idAdmin) {
    throw createHttpError("idAdmin est requis", 400);
  }

  if (!productId) {
    throw createHttpError("productId est requis", 400);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw createHttpError("Produit introuvable", 404);
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw createHttpError("Erreur lors de la suppression du produit", 500);
  }
  Object.values(product.pictures).map((picture) => {
    deletePictures(picture);
  });

  return { message: "Produit et images supprimés avec succès" };
}
export {
  getAllProductsForUser,
  getProductById,
  addProductToFavorites,
  removeProductFromFavorites,
  getFavoritesProducts,
  getAllProductsForAdmin,
  updateProductByAdmin,
  deleteProductByAdmin,
};
