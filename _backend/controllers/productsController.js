import Product from "../../_backend/models/Product";
import { User } from "../../_backend/models/Users";
import { createHttpError, validateObjectId } from "../../_backend/utils/helpers";

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

  if (userId !== user._id.toString()) throw createHttpError("Vous devez vous connecter pour ajouter un produit aux favoris", 400);

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

  if (userId !== user._id.toString()) throw createHttpError("Vous devez vous connecter pour supprimer un produit favoris", 400);

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

export {
  getAllProductsForUser,
  getProductById,
  addProductToFavorites,
  removeProductFromFavorites,
  getFavoritesProducts,
};
