// distributionRoutes.js

const express = require("express");
const router = express.Router();

const distributionController = require("../controllers/distributionController");
const { protect } = require("../middleware/authMiddleware");

// 🚚 Dealer distributes ration
router.post("/", protect, distributionController.distributeRation);

// 📜 History by ration card
router.get(
  "/ration-card/:rationCardId",
  protect,
  distributionController.getDistributionsByRationCard,
);

// ❌ DELETE Distribution and restore stock
router.delete("/:id", protect, distributionController.deleteDistribution);

// 🏠 Villager → My history
router.get("/my-history", protect, distributionController.getMyRationHistory);

module.exports = router;
