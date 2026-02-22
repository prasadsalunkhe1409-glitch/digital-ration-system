// routes/dealerRoutes.js

const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

// Import dealer controller functions
const {
  getDealerDashboard,
  distributeRation,
  dealerMonthlyReport,
  getDealerVillagers,
  getDealerStock,
  getDealerHistory,
  createStockRequest,
  getDealerRequests,
  getDealerProfile,
  updateDealerProfile,
  changeDealerPassword
} = require("../controllers/dealerController");


// ===============================
// DEALER DASHBOARD
// ===============================
router.get(
  "/dashboard",
  protect,
  authorize("dealer"),
  getDealerDashboard
);

// ===============================
// DISTRIBUTE RATION
// ===============================
router.post(
  "/distribute",
  protect,
  authorize("dealer"),
  distributeRation
);

// ===============================
// DEALER MONTHLY REPORT
// ===============================
router.get(
  "/reports/monthly",
  protect,
  authorize("dealer"),
  dealerMonthlyReport
);


// ===============================
// DEALER → GET ASSIGNED VILLAGERS
// ===============================
router.get(
  "/villagers",
  protect,
  authorize("dealer"),
  getDealerVillagers
);


// ===============================
// DEALER → DISTRIBUTION HISTORY
// ===============================
router.get(
  "/history",
  protect,
  authorize("dealer"),
  getDealerHistory
);


// ===============================
// DEALER → VIEW AVAILABLE STOCK
// ===============================
router.get(
  "/stock",
  protect,
  authorize("dealer"),
  getDealerStock
);


// ===============================
// DEALER → CREATE STOCK REQUEST
// ===============================
router.post(
  "/requests",
  protect,
  authorize("dealer"),
  createStockRequest
);


// ===============================
// DEALER → GET OWN STOCK REQUESTS
// ===============================
router.get(
  "/requests",
  protect,
  authorize("dealer"),
  getDealerRequests
);


// ===============================
// DEALER PROFILE
// ===============================
router.get(
  "/profile",
  protect,
  authorize("dealer"),
  getDealerProfile
);


router.put(
  "/profile",
  protect,
  authorize("dealer"),
  updateDealerProfile
);


router.put(
  "/change-password",
  protect,
  authorize("dealer"),
  changeDealerPassword
);

module.exports = router;