import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { getAllOrdersForAdmin } from "../../../../../_backend/controllers/orderController";
import { handleError } from "../../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();

    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token manquant" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?._id) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
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
