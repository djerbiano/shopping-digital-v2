import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getAllProductsForAdmin } from "../../../../_backend/controllers/productsController";
import { handleError, verifyToken } from "../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitProducts = parseInt(searchParams.get("limitProducts") || "50", 10);

    let parsedQuery = {};
    const queryProductsParam = searchParams.get("queryProducts");

    if (queryProductsParam) {
      try {
        parsedQuery = JSON.parse(queryProductsParam);
      } catch (error) {
        return NextResponse.json({ message: "Paramètres de recherche invalides" }, { status: 400 });
      }
    }

    if (isNaN(limitProducts) || limitProducts <= 0) {
      return NextResponse.json({ message: "Limite des produits invalide" }, { status: 400 });
    }

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: "Page invalide" }, { status: 400 });
    }

    const result = await getAllProductsForAdmin(payload?._id, limitProducts, page, parsedQuery);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
