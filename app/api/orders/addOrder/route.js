import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { addOrder } from "../../../../_backend/controllers/orderController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function POST(request) {
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

    const data = await request.json();

    const cart = {
      id: payload?._id,
      email: payload?.email,
      total: data.totalPanier,
      billingAddress: data.billingAddress || "",
      products: data.cart,
    };

    const result = await addOrder(cart);

    const response = NextResponse.json(result, { status: 201 });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
