import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { jwtVerify } from "jose";
import { addClaim } from "../../../../_backend/controllers/claimsController";
import { handleError } from "../../../../_backend/utils/helpers";

export async function POST(request) {
  try {
    await connectToDb();

    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Veuillez vous connecter pour envoyer une réclamation" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?.email) {
      return NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 });
    }

    const data = await request.json();

    const claim = {
      email: payload.email,
      claimInformation: data?.claimInformation,
      claimMessage: data?.claimMessage.trim(),
    };

    const result = await addClaim(claim);

    const response = NextResponse.json(result, { status: 201 });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
