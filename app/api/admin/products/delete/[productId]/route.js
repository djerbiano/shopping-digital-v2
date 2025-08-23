import { NextResponse } from "next/server";
import connectToDb from "../../../../../../_backend/config/db";
import { deleteProductByAdmin } from "../../../../../../_backend/controllers/productsController";
import { handleError, verifyToken } from "../../../../../../_backend/utils/helpers";

export async function DELETE(request, { params }) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json({ message: "ID du produit manquant" }, { status: 400 });
    }

    const result = await deleteProductByAdmin(payload?._id, productId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
