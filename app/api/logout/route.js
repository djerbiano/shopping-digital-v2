import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Déconnecté avec succès" });

  //delete cookie from server
  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}
