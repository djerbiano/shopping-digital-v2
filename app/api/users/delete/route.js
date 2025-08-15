import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectToDb from "../../../../_backend/config/db";
import { deleteAccount } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function DELETE(request) {
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

    const result = await deleteAccount(payload._id);

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Aucun compte supprimé" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Votre compte a bien été supprimé" });
    response.cookies.set("access_token", "", { expires: new Date(0) });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
