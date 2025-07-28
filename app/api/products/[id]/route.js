import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getProductById } from "../../../../_backend/controllers/productsController";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ message: "ID de produit manquant" }, { status: 400 });
    }

    const result = await getProductById(id);

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
