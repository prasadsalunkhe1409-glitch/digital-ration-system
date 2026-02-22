const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
  getAdminDashboard,
  getMonthlyReport,
  getYearlyReport,
  getDealerReport,
  getVillagerReport,
  getStockAnalytics,
  getAllStockRequests,
  approveStockRequest,
  rejectStockRequest,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} = require("../controllers/adminController");


// ===============================
// ADMIN DASHBOARD
// ===============================
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getAdminDashboard
);


// ===============================
// STOCK ANALYTICS
// ===============================
router.get(
  "/stock-analytics",
  protect,
  authorize("admin"),
  getStockAnalytics
);


// ===============================
// MONTHLY REPORT
// ===============================
router.get(
  "/reports/monthly",
  protect,
  authorize("admin"),
  getMonthlyReport
);


// ===============================
// YEARLY REPORT
// ===============================
router.get(
  "/reports/yearly",
  protect,
  authorize("admin"),
  getYearlyReport
);


// ===============================
// DEALER REPORT
// ===============================
router.get(
  "/reports/dealer/:dealerId",
  protect,
  authorize("admin"),
  getDealerReport
);


// ===============================
// VILLAGER REPORT
// ===============================
router.get(
  "/reports/villager/:villagerId",
  protect,
  authorize("admin"),
  getVillagerReport
);


// ===============================
// GET STOCK REQUESTS
// ===============================
router.get(
  "/stock-requests",
  protect,
  authorize("admin"),
  getAllStockRequests
);


// ===============================
// APPROVE STOCK REQUEST
// ===============================
router.put(
  "/stock-requests/:id/approve",
  protect,
  authorize("admin"),
  approveStockRequest
);


// ===============================
// REJECT STOCK REQUEST
// ===============================
router.put(
  "/stock-requests/:id/reject",
  protect,
  authorize("admin"),
  rejectStockRequest
);


// ===============================
// ADMIN PROFILE
// ===============================
router.get(
  "/profile",
  protect,
  authorize("admin"),
  getAdminProfile
);


router.put(
  "/profile",
  protect,
  authorize("admin"),
  updateAdminProfile
);


router.put(
  "/change-password",
  protect,
  authorize("admin"),
  changeAdminPassword
);


module.exports = router;
