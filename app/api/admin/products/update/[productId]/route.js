import { NextResponse } from "next/server";
import connectToDb from "../../../../../../_backend/config/db";
import { updateProductByAdmin } from "../../../../../../_backend/controllers/productsController";
import { handleError, verifyToken } from "../../../../../../_backend/utils/helpers";

export async function PATCH(request, { params }) {
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

    const body = await request.json();

    const result = await updateProductByAdmin(payload?._id, productId, body);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
