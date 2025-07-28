const Product = require("../../_backend/models/Product");

async function getAllProducts(page = 1, filters = {}) {
  try {
    const limit = 50;
    const skip = (page - 1) * limit;

    const query = {};

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
      status: 200,
      body: {
        success: true,
        data: products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
        },
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Erreur serveur lors de la récupération des produits",
      },
    };
  }
}
async function getProductById(id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return {
        status: 404,
        body: {
          success: false,
          error: "Produit non trouvé",
        },
      };
    }
    return {
      status: 200,
      body: {
        success: true,
        data: product,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return {
      status: 500,
      body: {
        success: false,
        error: "Erreur lors de la récupération du produit",
      },
    };
  }
}

module.exports = { getAllProducts, getProductById };
