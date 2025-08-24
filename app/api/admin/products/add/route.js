import { NextResponse } from "next/server";
import connectToDb from "../../../../../_backend/config/db";
import { addNewProduct } from "../../../../../_backend/controllers/productsController";
import { handleError, verifyToken } from "../../../../../_backend/utils/helpers";

export async function POST(request) {
  try {
    await connectToDb();
    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const body = await request.formData();
    const result = await addNewProduct(payload?._id, body);

    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
