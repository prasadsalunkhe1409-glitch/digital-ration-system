// models/RationCard.js

const mongoose = require("mongoose");

const rationCardSchema = new mongoose.Schema(
  {
    // Villager (User with role = villager)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assigned Dealer (User with role = dealer)
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cardNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["APL", "BPL", "Antyodaya"],
      required: true,
    },

    familyMembers: {
      type: Number,
      required: true,
      min: 1,
    },

    // Monthly quota (can be auto-calculated if needed)
    monthlyQuota: {
      rice: {
        type: Number,
        default: 0,
      },
      wheat: {
        type: Number,
        default: 0,
      },
      sugar: {
        type: Number,
        default: 0,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RationCard", rationCardSchema);
