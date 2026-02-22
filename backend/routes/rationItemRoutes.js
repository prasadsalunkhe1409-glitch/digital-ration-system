const express = require("express");
const router = express.Router();

const {
  createRationItem,
  getAllRationItems,
} = require("../controllers/rationItemController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ===============================
// CREATE RATION ITEM (Admin Only)
// ===============================
router.post("/", protect, authorize("admin"), createRationItem);

// ===============================
// GET ALL RATION ITEMS (Logged in users)
// ===============================
router.get("/", protect, getAllRationItems);

module.exports = router;
