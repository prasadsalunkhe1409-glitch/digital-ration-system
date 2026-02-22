const Distribution = require("../models/Distribution");
const RationCard = require("../models/RationCard");
const RationItem = require("../models/RationItem");

// =======================================================
// 🚚 POST: Dealer distributes ration (USE monthlyQuota)
// =======================================================
exports.distributeRation = async (req, res) => {
  try {
    const { rationCardNumber, month, year } = req.body;

    // Dealer validation
    if (!req.user || req.user.role !== "dealer") {
      return res.status(403).json({
        success: false,
        message: "Only dealers can distribute ration",
      });
    }

    // Validate input
    if (!rationCardNumber || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Ration card number, month and year required",
      });
    }

    const monthNum = Number(month);
    const yearNum = Number(year);

    if (isNaN(monthNum) || isNaN(yearNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month or year",
      });
    }

    // =====================================================
    // Find ration card
    // =====================================================

    const rationCard = await RationCard.findOne({
      cardNumber: rationCardNumber,
    });

    if (!rationCard) {
      return res.status(404).json({
        success: false,
        message: "Ration card not found",
      });
    }

    // =====================================================
    // Prevent duplicate distribution
    // =====================================================

    const exists = await Distribution.findOne({
      rationCard: rationCard._id,
      month: monthNum,
      year: yearNum,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already distributed this month",
      });
    }

    // =====================================================
    // Get ration items
    // =====================================================

    const rationItems = await RationItem.find();

    if (!rationItems.length) {
      return res.status(400).json({
        success: false,
        message: "No ration items available",
      });
    }

    const distributionItems = [];

    // =====================================================
    // STEP 1: Validate stock using monthlyQuota
    // =====================================================

    for (const item of rationItems) {
      const requiredQty =
        rationCard.monthlyQuota?.[item.name.toLowerCase()] || 0;

      if (item.stock < requiredQty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.name}`,
        });
      }
    }

    // =====================================================
    // STEP 2: Deduct stock
    // =====================================================

    for (const item of rationItems) {
      const requiredQty =
        rationCard.monthlyQuota?.[item.name.toLowerCase()] || 0;

      item.stock -= requiredQty;

      await item.save();

      distributionItems.push({
        item: item._id,
        quantity: requiredQty,
      });
    }

    // =====================================================
    // STEP 3: Create distribution
    // =====================================================

    const distribution = await Distribution.create({
      rationCard: rationCard._id,

      dealer: req.user._id,

      items: distributionItems,

      month: monthNum,

      year: yearNum,
    });

    // =====================================================
    // STEP 4: Return updated stock
    // =====================================================

    const updatedStock = await RationItem.find().select("name stock unit");

    return res.status(201).json({
      success: true,

      message: "Ration distributed successfully",

      distribution,

      updatedStock,
    });
  } catch (error) {
    console.error("Distribution Error:", error);

    res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

// =======================================================
// ❌ DELETE Distribution and Restore Stock
// =======================================================

exports.deleteDistribution = async (req, res) => {
  try {
    const { id } = req.params;

    const distribution = await Distribution.findById(id);

    if (!distribution) {
      return res.status(404).json({
        success: false,

        message: "Distribution not found",
      });
    }

    // Restore stock

    for (const distItem of distribution.items) {
      const item = await RationItem.findById(distItem.item);

      if (item) {
        item.stock += distItem.quantity;

        await item.save();
      }
    }

    await distribution.deleteOne();

    res.json({
      success: true,

      message: "Distribution deleted and stock restored",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

// =======================================================
// 📜 GET Distribution history
// =======================================================

exports.getDistributionsByRationCard = async (req, res) => {
  try {
    const { rationCardId } = req.params;

    const distributions = await Distribution.find({
      rationCard: rationCardId,
    })
      .populate("items.item", "name unit")
      .populate("dealer", "name email")
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,

      total: distributions.length,

      records: distributions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

// =======================================================
// 🏠 Villager history
// =======================================================

exports.getMyRationHistory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "villager") {
      return res.status(403).json({
        success: false,

        message: "Only villagers allowed",
      });
    }

    const rationCard = await RationCard.findOne({
      user: req.user._id,
    });

    if (!rationCard) {
      return res.status(404).json({
        success: false,

        message: "Ration card not found",
      });
    }

    const history = await Distribution.find({
      rationCard: rationCard._id,
    })
      .populate("items.item", "name unit")
      .populate("dealer", "name email")
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,

      total: history.length,

      history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};
