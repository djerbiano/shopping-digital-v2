import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { deleteOneClaim } from "../../../../../_backend/controllers/claimsController";
import { handleError, verifyToken } from "../../../../../_backend/utils/helpers";

export async function DELETE(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const data = await request.json();
    const claimId = data.claimId;

    if (!claimId) {
      return NextResponse.json({ message: "ID du réclamation manquant" }, { status: 400 });
    }

    const result = await deleteOneClaim(payload?._id, claimId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
