const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema(
  {
    rationCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RationCard",
      required: true,
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RationItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    month: {
      type: Number, // ✅ FIXED
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Distribution", distributionSchema);
