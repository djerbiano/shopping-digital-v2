import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { getOneOrdersForAdmin } from "../../../../../_backend/controllers/orderController";
import { handleError, verifyToken, validateObjectId } from "../../../../../_backend/utils/helpers";

export async function GET(request, { params }) {
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

    validateObjectId(orderId);

    const result = await getOneOrdersForAdmin(payload?._id, orderId);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
