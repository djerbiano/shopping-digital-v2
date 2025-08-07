import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { createUser } from "../../../../_backend/controllers/usersController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const user = await createUser(body);
    const token = user.token;

    const response = NextResponse.json(
      { user, message: ` Bienvenue ${user.name}, votre compte a bien été créé` },
      { status: 201 }
    );

    response.cookies.set("access_token", token, {
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
