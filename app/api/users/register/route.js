import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { createUser } from "../../../../_backend/controllers/usersController";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json(
      { user, message: ` Bienvenue ${user.name}, votre compte a bien été créé` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
