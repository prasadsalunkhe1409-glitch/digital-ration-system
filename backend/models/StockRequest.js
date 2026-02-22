const mongoose = require("mongoose");

const stockRequestSchema = new mongoose.Schema(
  {
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
      enum: ["Rice", "Wheat", "Sugar"], // limit to valid items
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    adminRemark: {
      type: String,
      default: "",
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StockRequest", stockRequestSchema);
