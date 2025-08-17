import { NextResponse } from "next/server";
import connectToDb from "../../../../../../_backend/config/db";
import { updateOneOrderForAdmin } from "../../../../../../_backend/controllers/orderController";
import { handleError, verifyToken, validateObjectId } from "../../../../../../_backend/utils/helpers";

export async function PATCH(request, { params }) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { orderId } = await params;
    if (!orderId) {
      return NextResponse.json({ message: "ID de commande manquant" }, { status: 400 });
    }

    const { newStatus } = await request.json();
    if (!newStatus) {
      return NextResponse.json({ message: "Statut de commande manquant" }, { status: 400 });
    }

    validateObjectId(orderId);

    const result = await updateOneOrderForAdmin(payload?._id, newStatus, orderId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
