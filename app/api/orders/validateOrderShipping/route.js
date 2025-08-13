import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { validateOrderShipping } from "../../../../_backend/controllers/orderController";
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

    if (!payload?.email) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
    }

    const data = await request.json();

    const validateShipping = {
      email: payload?.email,
      orderId: data.orderId,
    };

    const result = await validateOrderShipping(validateShipping);
    if (!result) {
      return NextResponse.json({ message: "Aucune commande trouvée" }, { status: 404 });
    }

    const response = NextResponse.json({ message: "Commande validée." }, { status: 200 });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
