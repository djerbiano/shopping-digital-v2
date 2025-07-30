import { NextResponse } from "next/server";
import connectToDb from "../../../../_backend/config/db";
import { getProductById } from "../../../../_backend/controllers/productsController";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 });
    }

    const product = await getProductById(id);

    return NextResponse.json(product);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json({ message: "Produit introuvable" }, { status: 404 });
    }
    console.error("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
  }
}
