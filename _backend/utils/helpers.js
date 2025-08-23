import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const path = require("path");
const fs = require("fs").promises;
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

async function verifyToken(request) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    return { error: NextResponse.json({ message: "Token manquant" }, { status: 401 }) };
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);

    if (!payload?._id) {
      return { error: NextResponse.json({ message: "Token invalide ou mal formé" }, { status: 401 }) };
    }

    return { payload };
  } catch (err) {
    return { error: NextResponse.json({ message: "Token invalide" }, { status: 401 }) };
  }
}

async function deletePictures(picture) {
  if (picture !== "avatarDefault.jpg") {
    const picturePath = path.resolve(process.cwd(), "public", picture);
    await fs.unlink(picturePath);

    //if picture is not delete from path , give the name of the picture to the next function

    

  }
}
export { generateToken, validateObjectId, createHttpError, handleError, verifyToken, deletePictures };
