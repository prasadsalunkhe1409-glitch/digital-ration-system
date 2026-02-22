// controllers/villagerController.js

const User = require("../models/User");
const Distribution = require("../models/Distribution");
const RationCard = require("../models/RationCard");
const bcrypt = require("bcryptjs");


// ===============================
// VILLAGER DASHBOARD
// ===============================
exports.getVillagerDashboard = async (req, res) => {
  try {

    const villagerId = req.user._id;

    const rationCard = await RationCard.findOne({
      user: villagerId
    })
    .populate("dealer", "name email")
    .populate("user", "name email");

    res.status(200).json({
      success: true,
      rationCard
    });

  } catch (error) {

    console.error("Villager Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ===============================
// VILLAGER RATION HISTORY
// ===============================
exports.getVillagerHistory = async (req, res) => {
  try {

    const villagerId = req.user._id;

    // First get ration card
    const rationCard = await RationCard.findOne({
      user: villagerId
    });

    if (!rationCard) {
      return res.status(404).json({
        success: false,
        message: "Ration card not found"
      });
    }

    // Then fetch distributions using rationCard id
    const history = await Distribution.find({
      rationCard: rationCard._id
    })
    .populate("dealer", "name email")
    .populate("rationCard", "cardNumber category")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history
    });

  } catch (error) {

    console.error("Villager History Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ===============================
// GET VILLAGER RATION CARD DETAILS
// ===============================
exports.getVillagerRationCard = async (req, res) => {
  try {

    const villagerId = req.user._id;

    const rationCard = await RationCard.findOne({
      user: villagerId
    })
    .populate("dealer", "name email")
    .populate("user", "name email");

    if (!rationCard) {
      return res.status(404).json({
        success: false,
        message: "Ration card not found"
      });
    }

    res.status(200).json({
      success: true,
      rationCard
    });

  } catch (error) {

    console.error("Get Villager Ration Card Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ===============================
// GET VILLAGER PROFILE
// ===============================
exports.getVillagerProfile = async (req, res) => {
  try {

    const villager = await User.findById(req.user._id)
      .select("-password");

    if (!villager) {
      return res.status(404).json({
        success: false,
        message: "Villager not found"
      });
    }

    res.status(200).json({
      success: true,
      villager
    });

  } catch (error) {

    console.error("Get Villager Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ===============================
// UPDATE VILLAGER PROFILE
// ===============================
exports.updateVillagerProfile = async (req, res) => {
  try {

    const { name, email } = req.body;

    const villager = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      villager
    });

  } catch (error) {

    console.error("Update Villager Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ===============================
// CHANGE VILLAGER PASSWORD
// ===============================
exports.changeVillagerPassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    const villager = await User.findById(req.user._id)
      .select("+password");

    if (!villager) {
      return res.status(404).json({
        success: false,
        message: "Villager not found"
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      villager.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    const salt = await bcrypt.genSalt(10);

    villager.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await villager.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {

    console.error("Change Villager Password Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

// ===============================
// VILLAGER NOTIFICATIONS
// ===============================
exports.getVillagerNotifications = async (req, res) => {
  try {

    const villagerId = req.user._id;

    // Find ration card of villager
    const rationCard = await RationCard.findOne({ user: villagerId });

    if (!rationCard) {
      return res.status(404).json({
        success: false,
        message: "No ration card found"
      });
    }

    // Find distributions for this ration card
    const notifications = await Distribution.find({
      rationCard: rationCard._id
    })
    .populate("dealer", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });

  } catch (error) {

    console.error("Villager Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
