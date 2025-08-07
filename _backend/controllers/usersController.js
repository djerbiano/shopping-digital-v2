import { User, validateRegisterUser, validateLoginUser } from "../models/Users.js";
import { generateToken, validateObjectId, createHttpError } from "../utils/helpers.js";
import bcrypt from "bcryptjs";

async function createUser(body) {
  const { error } = validateRegisterUser(body);
  if (error) throw createHttpError(error.details[0].message || "Une erreur est survenue", 400);

  const userExists = await User.findOne({ email: body.email });
  if (userExists) throw createHttpError("Veuillez utiliser une autre adresse mail", 400);

  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password.trim(), salt);

  const user = new User(body);
  const result = await user.save();

  if (!result) throw createHttpError("Une erreur est survenue lors de la sauvegarde de l'utilisateur", 500);

  const token = generateToken(result);
  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = result.toObject();

  return { ...other, token };
}

async function loginByEmail(body) {
  const { error } = validateLoginUser(body);
  if (error) throw createHttpError(error.details[0].message || "Une erreur est survenue", 400);
  // get user by email
  const user = await User.findOne({ email: body.email });

  if (!user) throw createHttpError("Utilisateur ou mot de passe incorrect", 400);

  const validPassword = await bcrypt.compare(body.password, user.password);
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

export { createUser, loginByEmail, getDataUserById, deleteAccount };
