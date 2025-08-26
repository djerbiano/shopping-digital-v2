import { NextResponse } from "next/server";
import connectToDb from "../../../_backend/config/db";
import { getAllProductsForUser } from "../../../_backend/controllers/productsController";
import { createHttpError, handleError } from "../../../_backend/utils/helpers";

export async function GET(req) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const rawPage = searchParams.get("page");
    const page = rawPage !== null ? parseInt(rawPage, 10) : 1;
    if (isNaN(page) || page < 1) {
      throw createHttpError("Le paramètre page doit être un entier positif", 400);
    }

    const SearcheByTitle = searchParams.get("search");
    if (SearcheByTitle) {
      const result = await getAllProductsForUser(page, { search: SearcheByTitle });
      return NextResponse.json(result);
    }

    const categoryParams = searchParams.getAll("category");
    const allowedCategories = ["Homme", "Femme", "Informatique", "TvSon", "Téléphonie"];
    if (!categoryParams.every((cat) => allowedCategories.includes(cat))) {
      throw createHttpError("Une ou plusieurs catégories ne sont pas valides", 400);
    }

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (minPrice !== null && (isNaN(Number(minPrice)) || Number(minPrice) < 0)) {
      throw createHttpError("minPrice doit être un nombre positif valide", 400);
    }
    if (maxPrice !== null && (isNaN(Number(maxPrice)) || Number(maxPrice) < 0)) {
      throw createHttpError("maxPrice doit être un nombre positif valide", 400);
    }
    if (minPrice !== null && maxPrice !== null && Number(minPrice) > Number(maxPrice)) {
      throw createHttpError("minPrice ne peut pas être supérieur à maxPrice", 400);
    }

    const filters = {
      categories: categoryParams.length > 0 ? categoryParams : [],
      minPrice: minPrice !== null ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== null ? Number(maxPrice) : undefined,
    };

    const result = await getAllProductsForUser(page, filters);

    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
