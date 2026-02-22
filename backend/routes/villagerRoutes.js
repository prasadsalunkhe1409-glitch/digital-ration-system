// routes/villagerRoutes.js

const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getVillagerDashboard,
  getVillagerHistory,
  getVillagerProfile,
  updateVillagerProfile,
  changeVillagerPassword,
  getVillagerRationCard,
  getVillagerNotifications,
} = require("../controllers/villagerController");

// ===============================
// VILLAGER DASHBOARD
// ===============================
router.get("/dashboard", protect, authorize("villager"), getVillagerDashboard);

// ===============================
// VILLAGER HISTORY
// ===============================
router.get("/history", protect, authorize("villager"), getVillagerHistory);

// ===============================
// GET PROFILE
// ===============================
router.get("/profile", protect, authorize("villager"), getVillagerProfile);

// ===============================
// UPDATE PROFILE
// ===============================
router.put("/profile", protect, authorize("villager"), updateVillagerProfile);

// ===============================
// CHANGE PASSWORD
// ===============================
router.put(
  "/change-password",
  protect,
  authorize("villager"),
  changeVillagerPassword,
);

router.get(
  "/ration-card",
  protect,
  authorize("villager"),
  getVillagerRationCard,
);

router.get(
  "/notifications",
  protect,
  authorize("villager"),
  getVillagerNotifications
);
module.exports = router;
