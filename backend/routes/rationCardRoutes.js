const express = require("express");
const router = express.Router();

const {
  createRationCard
} = require("../controllers/rationCardController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ADMIN only
router.post("/", protect, authorize("admin"), createRationCard);

module.exports = router;
