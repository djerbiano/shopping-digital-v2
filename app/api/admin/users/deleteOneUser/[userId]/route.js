import { NextResponse } from "next/server";
import connectToDb from "../../../../../../_backend/config/db";
import { deleteOneUserByAdmin } from "../../../../../../_backend/controllers/usersController";
import { handleError, verifyToken } from "../../../../../../_backend/utils/helpers";

export async function DELETE(request, { params }) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({ message: "ID du compte manquant" }, { status: 400 });
    }

    await deleteOneUserByAdmin(payload?._id, userId);

    const response = NextResponse.json({ message: "Le compte a bien été supprimé" });
    return response;
  } catch (error) {
    return handleError(error);
  }
}
