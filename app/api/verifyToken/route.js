import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    const isAdmin = payload?.isAdmin || false;

    return NextResponse.json({ success: true, isAdmin });
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    return NextResponse.json({ success: false });
  }
}
