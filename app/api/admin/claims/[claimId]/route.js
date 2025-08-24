import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { getOneClaimForAdmin } from "../../../../../_backend/controllers/claimsController";
import { handleError, verifyToken, validateObjectId } from "../../../../../_backend/utils/helpers";

export async function GET(request, { params }) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { claimId } = await params;
    if (!claimId) {
      return NextResponse.json({ message: "ID du réclamation manquant" }, { status: 400 });
    }

    validateObjectId(claimId);

    const result = await getOneClaimForAdmin(payload?._id, claimId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
