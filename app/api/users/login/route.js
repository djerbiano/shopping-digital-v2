import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { loginByEmail } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const result = await loginByEmail(body);

    const response = NextResponse.json({ result, message: ` Bienvenue ${result.email}` });

    response.cookies.set("access_token", result.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 5, // 5h like jwt
    });

    return response;
  } catch (error) {
  return handleError(error);
  }
}
