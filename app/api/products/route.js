import { NextResponse } from "next/server";
import connectToDb from "../../../_backend/config/db";
import { getAllProducts } from "../../../_backend/controllers/productsController";

export async function GET(req) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);

    const categoryParams = searchParams.getAll("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const filters = {
      categories: categoryParams.length > 0 ? categoryParams : [],
      minPrice: minPrice !== null ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== null ? Number(maxPrice) : undefined,
    };

    const result = await getAllProducts(page, filters);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
