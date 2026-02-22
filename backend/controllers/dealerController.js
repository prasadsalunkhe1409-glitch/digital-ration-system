// controllers/dealerController.js

const Distribution = require("../models/Distribution");
const RationItem = require("../models/RationItem");
const RationCard = require("../models/RationCard");
const StockRequest = require("../models/StockRequest");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

// ===============================
// DEALER DASHBOARD
// ===============================
exports.getDealerDashboard = async (req, res) => {
  try {
    const dealerId = req.user._id;

    const dealer = await User.findById(dealerId).select("-password");

    // Total distributions
    const totalDistributions = await Distribution.countDocuments({
      dealer: dealerId,
    });

    // Today's distributions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayDistributions = await Distribution.countDocuments({
      dealer: dealerId,
      createdAt: { $gte: today },
    });

    // Current month distributions
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const monthlyDistributions = await Distribution.countDocuments({
      dealer: dealerId,
      month: currentMonth,
      year: currentYear,
    });

    // Unique villagers served
    const villagersServed = await Distribution.distinct("rationCard", {
      dealer: dealerId,
    });

    // Stock summary
    const stock = await RationItem.find().select("name stock unit");

    res.status(200).json({
      success: true,
      dealer,
      stats: {
        totalDistributions,
        todayDistributions,
        monthlyDistributions,
        villagersServed: villagersServed.length,
      },
      stock,
    });
  } catch (error) {
    console.error("Dealer Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → DISTRIBUTE RATION
// ===============================
exports.distributeRation = async (req, res) => {
  try {
    const { cardNumber, month, year } = req.body;

    if (!cardNumber || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Card number, month and year required",
      });
    }

    // find ration card
    const rationCard = await RationCard.findOne({
      cardNumber,
      dealer: req.user._id,
    });

    if (!rationCard) {
      return res.status(404).json({
        success: false,
        message: "Ration card not found",
      });
    }

    // find items
    const rice = await RationItem.findOne({ name: "Rice" });
    const wheat = await RationItem.findOne({ name: "Wheat" });
    const sugar = await RationItem.findOne({ name: "Sugar" });

    if (!rice || !wheat || !sugar) {
      return res.status(400).json({
        success: false,
        message: "Ration items not found",
      });
    }

    // create distribution
    const distribution = await Distribution.create({
      rationCard: rationCard._id,

      dealer: req.user._id,

      month: Number(month),

      year: Number(year),

      items: [
        {
          item: rice._id,
          quantity: rationCard.monthlyQuota.rice,
        },
        {
          item: wheat._id,
          quantity: rationCard.monthlyQuota.wheat,
        },
        {
          item: sugar._id,
          quantity: rationCard.monthlyQuota.sugar,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Ration distributed successfully",
      distribution,
    });
  } catch (error) {
    console.error("Distribution Error:", error);

    res.status(500).json({
      success: false,
      message: "Distribution failed",
    });
  }
};

// ===============================
// DEALER MONTHLY REPORT
// ===============================
exports.dealerMonthlyReport = async (req, res) => {
  try {
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (isNaN(month) || isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month or year",
      });
    }

    const distributions = await Distribution.find({
      dealer: req.user._id,
      month,
      year,
    })
      .populate("rationCard", "cardNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalDistributions: distributions.length,
      records: distributions,
    });
  } catch (error) {
    console.error("Dealer Monthly Report Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → GET ASSIGNED VILLAGERS
// ===============================
exports.getDealerVillagers = async (req, res) => {
  try {
    const villagers = await RationCard.find({ dealer: req.user._id })
      .populate("user", "name email")
      .select("cardNumber category familyMembers monthlyQuota")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: villagers.length,
      villagers,
    });
  } catch (error) {
    console.error("Dealer Villagers Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching villagers",
    });
  }
};

// ===============================
// DEALER → DISTRIBUTION HISTORY
// ===============================
exports.getDealerHistory = async (req, res) => {
  try {
    const history = await Distribution.find({ dealer: req.user._id })
      .populate({
        path: "rationCard",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Dealer History Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → GET AVAILABLE STOCK
// ===============================
exports.getDealerStock = async (req, res) => {
  try {
    const items = await RationItem.find().select("name stock unit");

    res.status(200).json({
      success: true,
      count: items.length,
      stock: items,
    });
  } catch (error) {
    console.error("Dealer Stock Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching stock",
    });
  }
};

// ===============================
// DEALER → CREATE STOCK REQUEST
// ===============================
exports.createStockRequest = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;

    if (!itemName || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Item name and quantity required",
      });
    }

    const request = await StockRequest.create({
      dealer: req.user._id,
      itemName,
      quantity,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Stock request submitted",
      request,
    });
  } catch (error) {
    console.error("Create Stock Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → GET OWN STOCK REQUESTS
// ===============================
exports.getDealerRequests = async (req, res) => {
  try {
    const requests = await StockRequest.find({
      dealer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Fetch Dealer Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → GET PROFILE
// ===============================
exports.getDealerProfile = async (req, res) => {
  try {
    const dealer = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      dealer,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → UPDATE PROFILE
// ===============================
exports.updateDealerProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const dealer = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      dealer,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// DEALER → CHANGE PASSWORD
// ===============================
exports.changeDealerPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const dealer = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(currentPassword, dealer.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    dealer.password = await bcrypt.hash(newPassword, salt);

    await dealer.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
