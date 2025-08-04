const { User, validateRegisterUser, validateLoginUser } = require("../models/Users");
const { generateToken } = require("../utils/helpers");
const bcrypt = require("bcryptjs");
async function createUser(body) {
  const { error } = validateRegisterUser(body);
  if (error) throw new Error(error.details[0].message);

  const userExists = await User.findOne({ email: body.email });
  if (userExists) throw new Error("Veuillez utiliser une autre adresse mail");

  const salt = await bcrypt.genSalt(10);
  body.password = await bcrypt.hash(body.password.trim(), salt);

  const user = new User(body);
  const result = await user.save();

  if (!result) throw new Error("Une erreur est survenue lors de la sauvegarde de l'utilisateur");

  const token = generateToken(result);
  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = result.toObject();

  return { ...other, token };
}

async function getUserByEmail(body) {
  const { error } = validateLoginUser(body);
  if (error) throw new Error(error.details[0].message);
  // get user by email
  const user = await User.findOne({ email: body.email });

  if (!user) throw new Error("Utilisateur ou mot de passe incorrect");

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) throw new Error("Utilisateur ou mot de passe incorrect");

  // exclude certain properties from the user object
  const { password, updatedAt, __v, ...other } = user.toObject();

  const token = generateToken(user);

  return { ...other, token };
}

export { createUser, getUserByEmail };
