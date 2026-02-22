const RationItem = require("../models/RationItem");

// ===============================
// CREATE RATION ITEM (Admin)
// ===============================
exports.createRationItem = async (req, res) => {
  try {
    const { name, stock, unit } = req.body;

    if (!name || !stock || !unit) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const item = await RationItem.create({
      name,
      stock,
      unit,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("RATION ITEM CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// GET ALL RATION ITEMS
// ===============================
exports.getAllRationItems = async (req, res) => {
  try {
    const items = await RationItem.find();
    res.json(items);
  } catch (error) {
    console.error("RATION ITEM FETCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
