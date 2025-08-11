import Product from "../../_backend/models/Product";
import { createHttpError } from "../../_backend/utils/helpers";

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
async function getProductById(id) {
  const product = await Product.findById(id);
  if (!product) throw createHttpError("Produit introuvable", 404);
  return product;
}

export { getAllProductsForUser, getProductById };
