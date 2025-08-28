import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { updateClaimStatus } from "../../../../../_backend/controllers/claimsController";
import { handleError, verifyToken } from "../../../../../_backend/utils/helpers";

export async function PATCH(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const data = await request.json();
    const newStatus = data.claimStatus;
    const claimId = data.claimId;

    if (!claimId || !newStatus) {
      return NextResponse.json({ message: "ID du réclamation et statut manquants" }, { status: 400 });
    }

    const result = await updateClaimStatus(payload?._id, newStatus, claimId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
