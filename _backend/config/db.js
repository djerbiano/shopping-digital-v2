import mongoose from "mongoose";

let isConnected = false;

async function connectToDb() {
  if (isConnected) {
    console.log("Connexion MongoDB déjà active");
    return;
  }

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error("MONGODB_URI manquant dans .env");
  if (!dbName) throw new Error("DB_NAME manquant dans .env");

  try {
    await mongoose.connect(uri, {
      dbName,
    });

    isConnected = true;
    console.log(`Connecté à MongoDB : ${dbName}`);
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
}

export default connectToDb;
