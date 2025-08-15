import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { addProductToFavorites } from "../../../../_backend/controllers/productsController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function POST(request) {
  try {
    await connectToDb();

    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Veuillez vous connecter pour ajouter un produit aux favoris" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?._id) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
    }

    const data = await request.json();

    const dataFavorites = {
      userId: payload._id,
      productId: data.productId,
    };

    const result = await addProductToFavorites(dataFavorites);

    const response = NextResponse.json(result, { status: 201 });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
