import { NextResponse } from "next/server";
import connectToDb from "../../../_backend/config/db";
import { resetPassword } from "../../../_backend/controllers/usersController";
import { handleError } from "../../../_backend/utils/helpers";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const result = await resetPassword(body.email);

    return NextResponse.json({ message: result });
  } catch (error) {
    return handleError(error);
  }
}
