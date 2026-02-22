const mongoose = require("mongoose");

const User = require("../models/User");
const RationCard = require("../models/RationCard");
const RationItem = require("../models/RationItem");
const Distribution = require("../models/Distribution");
const StockRequest = require("../models/StockRequest");

const bcrypt = require("bcryptjs");


// ===============================
// ADMIN DASHBOARD
// ===============================
exports.getAdminDashboard = async (req, res) => {
  try {

    const totalVillagers =
      await User.countDocuments({ role: "villager" });

    const totalDealers =
      await User.countDocuments({ role: "dealer" });

    const totalAdmins =
      await User.countDocuments({ role: "admin" });

    const totalRationCards =
      await RationCard.countDocuments();

    const totalRationItems =
      await RationItem.countDocuments();

    const totalDistributions =
      await Distribution.countDocuments();


    const stockSummary =
      await RationItem.find()
        .select("name stock unit");


    const lowStockItems =
      await RationItem.find({
        stock: { $lt: 20 }
      }).select("name stock unit");


    res.json({
      users: {
        villagers: totalVillagers,
        dealers: totalDealers,
        admins: totalAdmins
      },
      rationCards: totalRationCards,
      rationItems: totalRationItems,
      distributions: totalDistributions,
      stockSummary,
      lowStockItems
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// MONTHLY REPORT
// ===============================
exports.getMonthlyReport = async (req, res) => {
  try {

    const month = Number(req.query.month);
    const year = Number(req.query.year);

    if (!month || !year)
      return res.status(400).json({
        message: "Month and year required"
      });


    const records =
      await Distribution.find({
        month,
        year
      })
      .populate("rationCard", "cardNumber")
      .populate("dealer", "name")
      .sort({ createdAt: -1 });


    res.json({
      totalDistributions: records.length,
      records
    });

  }
  catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// YEARLY REPORT
// ===============================
exports.getYearlyReport = async (req, res) => {
  try {

    const year = Number(req.query.year);

    if (!year)
      return res.status(400).json({
        message: "Year required"
      });


    const records =
      await Distribution.find({ year })
      .populate("rationCard", "cardNumber")
      .populate("dealer", "name")
      .sort({ month: 1 });


    res.json({
      totalDistributions: records.length,
      records
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// DEALER REPORT
// ===============================
exports.getDealerReport = async (req, res) => {

  try {

    const dealerId = req.params.dealerId;

    if (!mongoose.Types.ObjectId.isValid(dealerId))
      return res.status(400).json({
        message: "Invalid dealer ID"
      });


    const records =
      await Distribution.find({
        dealer: dealerId
      })
      .populate("rationCard", "cardNumber")
      .sort({ createdAt: -1 });


    res.json({
      totalDistributions: records.length,
      records
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// VILLAGER REPORT
// ===============================
exports.getVillagerReport = async (req, res) => {

  try {

    const villagerId = req.params.villagerId;

    if (!mongoose.Types.ObjectId.isValid(villagerId))
      return res.status(400).json({
        message: "Invalid villager ID"
      });


    const records =
      await Distribution.find()
      .populate({
        path: "rationCard",
        match: { user: villagerId },
        select: "cardNumber"
      })
      .populate("dealer", "name");


    const filtered =
      records.filter(r => r.rationCard);


    res.json({
      totalDistributions: filtered.length,
      records: filtered
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// STOCK ANALYTICS
// ===============================
exports.getStockAnalytics = async (req, res) => {

  try {

    const data =
      await Distribution.aggregate([

        { $unwind: "$items" },

        {
          $group: {
            _id: "$items.item",
            totalQuantity: {
              $sum: "$items.quantity"
            }
          }
        },

        {
          $lookup: {
            from: "rationitems",
            localField: "_id",
            foreignField: "_id",
            as: "item"
          }
        },

        { $unwind: "$item" },

        {
          $project: {
            name: "$item.name",
            totalQuantity: 1
          }
        }

      ]);


    res.json(data);

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// GET STOCK REQUESTS
// ===============================
exports.getAllStockRequests = async (req, res) => {

  try {

    const requests =
      await StockRequest.find()
      .populate("dealer", "name email")
      .sort({ createdAt: -1 });


    res.json({
      success: true,
      count: requests.length,
      requests
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// APPROVE REQUEST
// ===============================
exports.approveStockRequest = async (req, res) => {

  try {

    const request =
      await StockRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({
        message: "Request not found"
      });


    if (request.status !== "Pending")
      return res.status(400).json({
        message: "Already processed"
      });


    const item =
      await RationItem.findOne({
        name: request.itemName
      });


    if (!item)
      return res.status(404).json({
        message: "Item not found"
      });


    item.stock += request.quantity;

    await item.save();


    request.status = "Approved";

    await request.save();


    res.json({
      success: true,
      message: "Request approved"
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// REJECT REQUEST
// ===============================
exports.rejectStockRequest = async (req, res) => {

  try {

    const request =
      await StockRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({
        message: "Request not found"
      });


    request.status = "Rejected";

    await request.save();


    res.json({
      success: true,
      message: "Request rejected"
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// GET ADMIN PROFILE
// ===============================
exports.getAdminProfile = async (req, res) => {

  try {

    const admin =
      await User.findById(req.user._id)
      .select("-password");

    if (!admin)
      return res.status(404).json({
        message: "Admin not found"
      });


    res.json({
      success: true,
      admin
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// UPDATE ADMIN PROFILE
// ===============================
exports.updateAdminProfile = async (req, res) => {

  try {

    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({
        message: "Name and email required"
      });


    const admin =
      await User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true }
      ).select("-password");


    res.json({
      success: true,
      admin
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};



// ===============================
// CHANGE ADMIN PASSWORD
// ===============================
exports.changeAdminPassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword
    } = req.body;


    if (!currentPassword || !newPassword)
      return res.status(400).json({
        message: "Both passwords required"
      });


    const admin =
      await User.findById(req.user._id)
      .select("+password");


    const match =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );


    if (!match)
      return res.status(400).json({
        message: "Wrong current password"
      });


    const salt =
      await bcrypt.genSalt(10);


    admin.password =
      await bcrypt.hash(newPassword, salt);


    await admin.save();


    res.json({
      success: true,
      message: "Password changed"
    });

  }
  catch {

    res.status(500).json({
      message: "Server error"
    });

  }
};
