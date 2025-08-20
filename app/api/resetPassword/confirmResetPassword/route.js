import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectToDb from "../../../../_backend/config/db";
import { confirmResetPassword } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function PATCH(request) {
  try {
    await connectToDb();
    const data = await request.json();
    const { token, password } = data;
    if (!token) {
      return NextResponse.json({ message: "Token manquant" }, { status: 401 });
    }
    if (!password) {
      return NextResponse.json({ message: "Mot de passe manquant" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    const typeToken = payload.token;
    if (typeToken !== "resetPassword") {
      return NextResponse.json({ message: "Le lien de réinitialisation est invalide" }, { status: 401 });
    }

    if (!payload?.id || !payload?.email) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
    }

    const dataConfirmResetPassword = {
      password: password.trim(),
      id: payload.id,
    };

    const response = await confirmResetPassword(dataConfirmResetPassword);
    return NextResponse.json(response);
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json({ message: "Le lien a expiré, veuillez refaire la demande" }, { status: 401 });
    }
    return handleError(error);
  }
}
