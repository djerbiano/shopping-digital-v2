const mongoose = require("mongoose");
const joi = require("joi");
const Product = require("./Product");

const UsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    validateEmail: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "avatarDefault.jpg",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    verifyProfile: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favoritesProduct: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UsersSchema);

// validate Register user
function validateRegisterUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.empty": "L'email est obligatoire.",
      "string.min": "L'email doit contenir au moins 5 caractères.",
      "string.max": "L'email ne doit pas dépasser 100 caractères.",
      "string.email": "L'email doit être une adresse valide.",
      "any.required": "L'email est obligatoire.",
    }),
    password: joi.string().trim().min(6).required().messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.empty": "Le mot de passe est obligatoire.",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
      "any.required": "Le mot de passe est obligatoire.",
    }),
    name: joi.string().trim().min(4).max(100).required().messages({
      "string.base": "Le nom doit être une chaîne de caractères.",
      "string.empty": "Le nom est obligatoire.",
      "string.min": "Le nom doit contenir au moins 4 caractères.",
      "string.max": "Le nom ne doit pas dépasser 100 caractères.",
      "any.required": "Le nom est obligatoire.",
    }),
    lastName: joi.string().trim().min(4).max(100).required().messages({
      "string.base": "Le prénom doit être une chaîne de caractères.",
      "string.empty": "Le prénom est obligatoire.",
      "string.min": "Le prénom doit contenir au moins 4 caractères.",
      "string.max": "Le prénom ne doit pas dépasser 100 caractères.",
      "any.required": "Le prénom est obligatoire.",
    }),
    phone: joi.string().trim().min(5).max(100).required().messages({
      "string.base": "Le numéro de téléphone doit être une chaîne de caractères.",
      "string.empty": "Le numéro de téléphone est obligatoire.",
      "string.min": "Le numéro de téléphone doit contenir au moins 5 caractères.",
      "string.max": "Le numéro de téléphone ne doit pas dépasser 100 caractères.",
      "any.required": "Le numéro de téléphone est obligatoire.",
    }),
    address: joi.string().trim().min(5).max(100).required().messages({
      "string.base": "L'adresse doit être une chaîne de caractères.",
      "string.empty": "L'adresse est obligatoire.",
      "string.min": "L'adresse doit contenir au moins 5 caractères.",
      "string.max": "L'adresse ne doit pas dépasser 100 caractères.",
      "any.required": "L'adresse est obligatoire.",
    }),
  });
  return schema.validate(obj);
}
// validate new email
function validateNewMail(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).email().messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.empty": "L'email est obligatoire.",
      "string.min": "L'email doit contenir au moins 5 caractères.",
      "string.max": "L'email ne doit pas dépasser 100 caractères.",
      "string.email": "L'email doit être une adresse valide.",
    }),
  });
  return schema.validate(obj);
}
// validate new password
function validateNewPassword(obj) {
  const schema = joi.object({
    password: joi.string().trim().min(6).messages({
      "string.empty": "Le mot de passe est obligatoire.",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
    }),
  });
  return schema.validate(obj);
}

// validate login user
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      "string.base": "L'email doit être une chaîne de caractères.",
      "string.empty": "L'email est obligatoire.",
      "string.min": "L'email doit contenir au moins 5 caractères.",
      "string.max": "L'email ne doit pas dépasser 100 caractères.",
      "string.email": "L'email doit être une adresse valide.",
      "any.required": "L'email est obligatoire.",
    }),
    password: joi.string().trim().min(6).required().messages({
      "string.empty": "Le mot de passe est obligatoire.",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
      "any.required": "Le mot de passe est obligatoire.",
    }),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateNewPassword,
  validateNewMail,
  validateLoginUser,
};
