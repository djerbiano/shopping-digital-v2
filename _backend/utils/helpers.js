const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

export function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID utilisateur invalide");
  }
}



export { generateToken, validateObjectId };
