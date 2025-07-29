import connectToDb from "../_backend/config/db";
import { getAllProducts } from "../_backend/controllers/productsController";

import HomeClient from "./_Components/clientSide/HomeClient";

export default async function Home() {
  await connectToDb();

  const { products } = await getAllProducts(1);

  //transforme les produits en objets simples JSON (sans méthodes ou références)
  const safeProducts = products.map((product) => JSON.parse(JSON.stringify(product)));

  return <HomeClient products={safeProducts} />;
}
