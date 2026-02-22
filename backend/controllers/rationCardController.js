const RationCard = require("../models/RationCard");

// ===============================
// CREATE RATION CARD (Admin)
// ===============================
exports.createRationCard = async (req, res) => {
  try {
    const {
      cardNumber,
      category,
      user,
      dealer,
      familyMembers,
      monthlyQuota,
      isActive
    } = req.body;

    // ✅ Required validation
    if (!cardNumber || !category || !user || !dealer || !familyMembers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await RationCard.findOne({ cardNumber });
    if (existing) {
      return res.status(400).json({ message: "Ration card already exists" });
    }

    const rationCard = await RationCard.create({
      cardNumber,
      category,
      user,
      dealer,
      familyMembers,
      monthlyQuota,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json(rationCard);

  } catch (error) {
    console.error("RATION CARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
