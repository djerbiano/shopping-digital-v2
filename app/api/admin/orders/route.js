import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { getAllOrdersForAdmin } from "../../../../_backend/controllers/orderController";
import { handleError } from "../../../../_backend/utils/helpers";

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
    const filters = searchParams.get("filters") ? JSON.parse(searchParams.get("filters")) : {};

    const result = await getAllOrdersForAdmin(payload._id, page, filters);

    const response = NextResponse.json(result);

    return response;
  } catch (error) {
    return handleError(error);
  }
}
