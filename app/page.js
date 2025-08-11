import connectToDb from "../_backend/config/db";
import { getAllProductsForUser } from "../_backend/controllers/productsController";
import HomeWrapper from "./_Components/clientSide/HomeWrapper";

export default async function Home() {
  await connectToDb();

  const { products } = await getAllProductsForUser(1);

  if (products.length === 0) throw new Error("Aucun produit disponible");

  //transforme les produits en objets simples JSON (sans méthodes ou références)
  const safeProducts = products.map((product) => JSON.parse(JSON.stringify(product)));

  return <HomeWrapper products={safeProducts} />;
}
