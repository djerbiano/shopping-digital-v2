import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectToDb from "../../../../_backend/config/db";
import { updateAccount } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function PATCH(request) {
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

    // add the user id to the data
    data.id = payload._id;

    const updatedUser = await updateAccount(data);

    const { password, tokenResetPassword, updatedAt, __v, ...other } = updatedUser.toObject();

    return NextResponse.json(
      { message: "Compte mis à jour, Veuillez vous reconnecter pour avoir les nouvelles informations", user: other },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
