const Distribution = require("../models/Distribution");
const RationItem = require("../models/RationItem");

// ==========================================
// DEALER DASHBOARD
// ==========================================
exports.getDealerDashboard = async (req, res) => {
  try {
    const dealerId = req.user._id;

    // ===== Date helpers =====
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const monthStart = new Date(
      todayStart.getFullYear(),
      todayStart.getMonth(),
      1
    );

    // ===== Distribution Counts =====
    const totalDistributions = await Distribution.countDocuments({
      dealer: dealerId,
    });

    const todayDistributions = await Distribution.countDocuments({
      dealer: dealerId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    const monthlyDistributions = await Distribution.countDocuments({
      dealer: dealerId,
      createdAt: { $gte: monthStart },
    });

    // ===== Villagers Served (Unique) =====
    const distributions = await Distribution.find({
      dealer: dealerId,
    }).populate({
      path: "rationCard",
      select: "user",
    });

    const uniqueVillagers = new Set(
      distributions
        .map((d) => d.rationCard?.user?.toString())
        .filter(Boolean)
    );

    const villagersServedCount = uniqueVillagers.size;

    // ===== Stock Summary =====
    const stockItems = await RationItem.find({ dealer: dealerId }).select(
      "name stock unit"
    );

    res.status(200).json({
      dealer: {
        name: req.user.name,
        email: req.user.email,
      },
      stats: {
        totalDistributions,
        todayDistributions,
        monthlyDistributions,
        villagersServed: villagersServedCount,
      },
      stock: stockItems,
    });

  } catch (error) {
    console.error("Dealer Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
