import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getAllClaimsForAdmin } from "../../../../_backend/controllers/claimsController";
import { handleError, verifyToken } from "../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitClaims = parseInt(searchParams.get("limitClaims") || "5", 10);

    let parsedQuery = {};
    const queryClaimsParam = searchParams.get("queryClaims");

    if (queryClaimsParam) {
      try {
        parsedQuery = JSON.parse(queryClaimsParam);
      } catch (error) {
        return NextResponse.json({ message: "Paramètres de recherche invalides" }, { status: 400 });
      }
    }

    if (isNaN(limitClaims) || limitClaims <= 0) {
      return NextResponse.json({ message: "Limite de réclamation invalide" }, { status: 400 });
    }

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: "Page invalide" }, { status: 400 });
    }

    const result = await getAllClaimsForAdmin(payload?._id, limitClaims, page, parsedQuery);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
