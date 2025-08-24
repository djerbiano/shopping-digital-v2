import Product from "../../_backend/models/Product";
import { User } from "../../_backend/models/Users";
import { createHttpError, validateObjectId, deletePictures } from "../../_backend/utils/helpers";
import { put } from "@vercel/blob";
import sharp from "sharp";

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

  const successDelete = await deletePictures(product.pictures);

  if (successDelete) {
    console.log("✅ Images supprimées");
  } else {
    console.warn("⚠️ Images non supprimées (voir logs)");
  }

  return { message: "Produit et images supprimés avec succès" };
}
async function addNewProduct(idAdmin, formData) {
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

  if (!formData) {
    throw createHttpError("formData est requis", 400);
  }

  if (!formData.get("title")) {
    throw createHttpError("Le titre est requis", 400);
  }

  if (!formData.get("category")) {
    throw createHttpError("La catégorie est requise", 400);
  }

  if (!formData.get("regularPrice")) {
    throw createHttpError("Le prix régulier est requis", 400);
  }

  const description = JSON.parse(formData.get("description"));
  const colors = JSON.parse(formData.get("colors"));

  const productData = {
    title: formData.get("title"),
    category: formData.get("category"),
    regularPrice: parseFloat(formData.get("regularPrice")),
    isOnSale: formData.get("isOnSale") === "true",
    salePrice: formData.get("salePrice") ? parseFloat(formData.get("salePrice")) : 0,
    isTopSeller: formData.get("isTopSeller") === "true",
    isNewCollection: formData.get("isNewCollection") === "true",
    isLimitedEdition: formData.get("isLimitedEdition") === "true",
    stock: formData.get("stock") === "true",
    description: description,
    colors: colors,
  };

  if (!productData.description.desc1?.trim()) {
    throw createHttpError("La description 1 est requise", 400);
  }

  if (!productData.description.desc2?.trim()) {
    throw createHttpError("La description 2 est requise", 400);
  }
  if (!productData.description.desc3?.trim()) {
    throw createHttpError("La description 3 est requise", 400);
  }
  if (!colors.length) {
    throw createHttpError("Au moins une couleur est requise", 400);
  }

  for (const color of colors) {
    if (!color.color?.trim()) {
      throw createHttpError("Toutes les couleurs doivent avoir un nom", 400);
    }
    if (!color.sizes?.length) {
      throw createHttpError(`La couleur "${color.color}" doit avoir au moins une taille`, 400);
    }
    for (const size of color.sizes) {
      if (!size.size?.trim()) {
        throw createHttpError("Toutes les tailles doivent avoir un nom", 400);
      }
      if (size.quantity < 0) {
        throw createHttpError("Les quantités ne peuvent pas être négatives", 400);
      }
    }
  }

  const images = [];

  for (let i = 1; i <= 3; i++) {
    const imageFile = formData.get(`image${i}`);

    // min 3 pictures
    if (!imageFile || imageFile.size === 0) {
      throw createHttpError(`L'image ${i} est manquante. Vous devez fournir 3 images`, 400);
    }

    if (!imageFile.type.startsWith("image/")) {
      throw createHttpError(
        `L'image ${i} ("${imageFile.name}") n'est pas une image valide. Type: ${imageFile.type}`,
        400
      );
    }

    //max vercel 4.5MB
    if (imageFile.size > 4.5 * 1024 * 1024) {
      throw createHttpError(`L'image ${i} ("${imageFile.name}") dépasse 4.5MB`, 400);
    }

    try {
      //process with Sharp
      const processedImage = await sharp(await imageFile.arrayBuffer())
        .resize(500, 500, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toBuffer();

      // validate size after compression
      if (processedImage.length > 4.5 * 1024 * 1024) {
        throw createHttpError(`L'image ${i} traitée dépasse toujours 4.5MB après compression`, 400);
      }

      // upload to vercel blob
      const timestamp = Date.now();
      const blob = await put(`products/${timestamp}-${i}.webp`, processedImage, {
        access: "public",
        contentType: "image/webp",
      });

      images.push(blob.url);
    } catch (error) {
      throw createHttpError(`Erreur traitement image ${i} ("${imageFile.name}"): ${error.message}`, 500);
    }
  }

  const product = await Product.create({
    ...productData,
    pictures: {
      pic1: images[0],
      pic2: images[1],
      pic3: images[2],
    },
  });

  return product;
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
  addNewProduct,
};
