import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
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

async function deletePictures(pictures) {
  if (!pictures) return true;

  try {
    const deletePromises = [];

    if (pictures.pic1 && !pictures.pic1.includes("avatarDefault")) {
      deletePromises.push(del(pictures.pic1));
    }

    if (pictures.pic2 && !pictures.pic2.includes("avatarDefault")) {
      deletePromises.push(del(pictures.pic2));
    }

    if (pictures.pic3 && !pictures.pic3.includes("avatarDefault")) {
      deletePromises.push(del(pictures.pic3));
    }

    if (deletePromises.length > 0) {
      await Promise.all(deletePromises);
    }

    return true;
  } catch (error) {
    console.error("Erreur suppression images:", error.message);
    return false;
  }
}
export { generateToken, validateObjectId, createHttpError, handleError, verifyToken, deletePictures };
