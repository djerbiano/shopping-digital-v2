import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateNewMail,
  validateNewPassword,
} from "../models/Users.js";
import { generateToken, validateObjectId, createHttpError } from "../utils/helpers.js";
async function createUser(body) {
  const data = {
    ...body,
    email: body.email.trim().toLowerCase(),
    password: body.password.trim(),
  };
  const { error } = validateRegisterUser(data);
  if (error) throw createHttpError(error.details?.[0]?.message || "Une erreur est survenue", 400);

  const userExists = await User.findOne({ email: data.email });
  if (userExists) throw createHttpError("Veuillez utiliser une autre adresse mail", 400);

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  const user = new User(data);
  const result = await user.save();

  if (!result) throw createHttpError("Une erreur est survenue lors de la sauvegarde de l'utilisateur", 500);

  const token = generateToken(result);
  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = result.toObject();

  return { ...other, token };
}

async function loginByEmail(body) {
  const data = {
    ...body,
    email: body.email.trim().toLowerCase(),
    password: body.password.trim(),
  };
  const { error } = validateLoginUser(data);
  if (error) throw createHttpError(error.details?.[0]?.message || "Une erreur est survenue", 400);
  // get user by email
  const user = await User.findOne({ email: data.email });

  if (!user) throw createHttpError("Utilisateur ou mot de passe incorrect", 400);

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) throw createHttpError("Utilisateur ou mot de passe incorrect", 400);

  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = user.toObject();

  const token = generateToken(user);

  return { ...other, token };
}

async function getDataUserById(id) {
  validateObjectId(id);
  // get user by id
  const user = await User.findOne({ _id: id });

  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = user.toObject();

  return { ...other };
}

async function deleteAccount(id) {
  validateObjectId(id);

  const user = await User.findOne({ _id: id });

  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  const result = await User.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw createHttpError("Impossible de supprimer le compte, veuillez réessayer plus tard", 500);
  }

  return result;
}

async function updateAccount(data) {
  const id = typeof data.id === "string" ? data.id : data.id.toString();

  validateObjectId(id);

  const user = await User.findById(id);

  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  // field can be updated : email, name, lastName, phone, address, password.

  const fieldToUpdate = {};

  // clean data
  if (data.email) data.email = data.email.trim().toLowerCase();
  if (data.name) data.name = data.name.trim();
  if (data.lastName) data.lastName = data.lastName.trim();
  if (data.phone) data.phone = data.phone.trim();
  if (data.address) data.address = data.address.trim();
  if (data.password) data.password = data.password.trim();
  if (data.newPassword) data.newPassword = data.newPassword.trim();

  if (data.password || data.newPassword) {
    if (!data.newPassword || !data.password) throw createHttpError("Veuillez fournir les deux mots de passe", 400);

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw createHttpError("Ancien mot de passe incorrect", 400);

    const { error } = validateNewPassword({ password: data.newPassword });

    if (error)
      throw createHttpError(
        error.details?.[0]?.message || "Une erreur est survenue lors de la modification du mot de passe",
        400
      );

    const salt = await bcrypt.genSalt(10);
    fieldToUpdate.password = await bcrypt.hash(data.newPassword, salt);
  }

  if (data.email) {
    const { error } = validateNewMail({ email: data.email });
    console.log(error);
    if (error)
      throw createHttpError(
        error.details?.[0]?.message || "Une erreur est survenue lors de la modification de l'email",
        400
      );
    // check if email already exists $ne = not equal
    const emailExists = await User.findOne({
      email: data.email,
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    });
    if (emailExists) throw createHttpError("Cet email est déjà utilisé", 400);

    fieldToUpdate.email = data.email;
  }

  if (data.name) {
    if (data.name.length < 4 || data.name.length > 20)
      throw createHttpError("Le nom doit contenir entre 4 et 20 caractères", 400);
    fieldToUpdate.name = data.name;
  }

  if (data.lastName) {
    if (data.lastName.length < 4 || data.lastName.length > 20)
      throw createHttpError("Le prénom doit contenir entre 4 et 20 caractères", 400);
    fieldToUpdate.lastName = data.lastName;
  }

  if (data.phone) {
    if (data.phone.length < 5 || data.phone.length > 20)
      throw createHttpError("Le numéro de téléphone doit contenir entre 5 et 20 caractères", 400);
    fieldToUpdate.phone = data.phone;
  }

  if (data.address) {
    if (data.address.length < 5 || data.address.length > 100)
      throw createHttpError("L'adresse doit contenir entre 5 et 100 caractères", 400);
    fieldToUpdate.address = data.address;
  }

  // check if fieldToUpdate is empty
  if (Object.keys(fieldToUpdate).length === 0) {
    throw createHttpError("Aucune donnée valide à mettre à jour", 400);
  }

  const updatedUser = await User.findByIdAndUpdate(id, { $set: fieldToUpdate }, { new: true, runValidators: true });
  if (!updatedUser) {
    throw createHttpError("Impossible de mettre à jour le compte, veuillez réessayer plus tard", 500);
  }

  return updatedUser;
}

export { createUser, loginByEmail, getDataUserById, deleteAccount, updateAccount };
