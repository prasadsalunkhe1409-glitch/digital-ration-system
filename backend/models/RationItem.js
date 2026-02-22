const mongoose = require("mongoose");

const rationItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },

    // ✅ Monthly quota per category
    quota: {
      APL: Number,
      BPL: Number,
      AAY: Number,
    },

    // ✅ STOCK
    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    // ✅ LOW STOCK ALERT THRESHOLD
    lowStockThreshold: {
      type: Number,
      default: 20, // alert when stock <= 20
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RationItem", rationItemSchema);
