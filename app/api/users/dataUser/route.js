import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectToDb from "../../../../_backend/config/db";
import { getDataUserById } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();
    const token = request.cookies.get("access_token")?.value;

   
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const { payload } = await jwtVerify(token, secret);
    if (!payload?._id) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
    }

    // const result = await getDataUserById("test");
    const result = await getDataUserById(payload._id);

    const response = NextResponse.json(result);

    return response;
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json({ message: "Session expirée, veuillez vous reconnecter." }, { status: 401 });
    }
    return handleError(error);
  }
}
