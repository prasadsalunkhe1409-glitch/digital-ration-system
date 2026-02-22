// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,      // ✅ single unique index (keep this)
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,     // 🔐 hidden by default (correct)
    },

    role: {
      type: String,
      enum: ["admin", "dealer", "villager"],
      default: "villager",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
