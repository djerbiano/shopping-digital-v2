import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { showOrderForUser } from "../../../../_backend/controllers/orderController";
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

    const result = await showOrderForUser(payload);
    if (!result) {
      return NextResponse.json({ message: "Aucune commande trouvée" }, { status: 404 });
    }

    const response = NextResponse.json(result);

    return response;
  } catch (error) {
    return handleError(error);
  }
}
