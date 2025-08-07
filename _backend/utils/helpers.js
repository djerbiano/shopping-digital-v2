import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5h" }
  );
}
function createHttpError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError("ID invalide", 400);
    // throw new Error("ID utilisateur invalide");
  }
}
function handleError(error) {
  console.error("Erreur serveur :", error);

  return NextResponse.json({ message: error.message || "Erreur serveur" }, { status: error.statusCode || 500 });
}
export { generateToken, validateObjectId, createHttpError, handleError };
