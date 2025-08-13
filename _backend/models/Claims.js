const mongoose = require("mongoose");
const Order = require("../models/Order");
const { User } = require("../models/Users");

const ClaimsSchema = mongoose.Schema(
  {
    status: {
      enum: ["En attente", "Traitement", "Cloturer"],
      type: String,
      required: true,
      default: "En attente",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    messages: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        startDate: { type: Date, default: () => new Date() },
      },
    ],
  },
  { timestamps: true }
);

const Claims = mongoose.models.Claims || mongoose.model("Claims", ClaimsSchema);
module.exports = Claims;
