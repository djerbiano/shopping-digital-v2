import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getProductById } from "../../../../_backend/controllers/productsController";
import { validateObjectId, handleError } from "../../../../_backend/utils/helpers";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const { id } = await params;

    //validate mongoDB ID before fetching product
    validateObjectId(id);

    const product = await getProductById(id);

    return NextResponse.json(product);
  } catch (error) {
    return handleError(error);
  }
}
