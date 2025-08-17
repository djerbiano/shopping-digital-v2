import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { getAllOrdersForAdmin } from "../../../../../_backend/controllers/orderController";
import { handleError, verifyToken } from "../../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitOrders = parseInt(searchParams.get("limitOrders") || "5", 10);

    let parsedQuery = {};
    const queryOrdersParam = searchParams.get("queryOrders");

    if (queryOrdersParam) {
      try {
        parsedQuery = JSON.parse(queryOrdersParam);
      } catch (error) {
        return NextResponse.json({ message: "Paramètres de recherche invalides" }, { status: 400 });
      }
    }

    if (isNaN(limitOrders) || limitOrders < 0) {
      return NextResponse.json({ message: "Limite de commandes invalide" }, { status: 400 });
    }

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: "Page invalide" }, { status: 400 });
    }

    const result = await getAllOrdersForAdmin(payload?._id, limitOrders, page, parsedQuery);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
