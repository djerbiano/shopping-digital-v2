import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getAllUsersByAdmin } from "../../../../_backend/controllers/usersController";
import { handleError, verifyToken } from "../../../../_backend/utils/helpers";

export async function GET(request) {
  try {
    await connectToDb();

    const { payload, error } = await verifyToken(request);

    if (error) {
      return error;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitUsers = parseInt(searchParams.get("limitUsers") || "5", 10);

    let parsedQuery = {};
    const queryUsersParam = searchParams.get("queryUsers");

    if (queryUsersParam) {
      try {
        parsedQuery = JSON.parse(queryUsersParam);
      } catch (error) {
        return NextResponse.json({ message: "Paramètres de recherche invalides" }, { status: 400 });
      }
    }

    if (isNaN(limitUsers) || limitUsers <= 0) {
      return NextResponse.json({ message: "Limite invalide" }, { status: 400 });
    }

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: "Page invalide" }, { status: 400 });
    }

    const result = await getAllUsersByAdmin(payload?._id, limitUsers, page, parsedQuery);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
