const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===============================
// PROTECT ROUTES (JWT VERIFY)
// ===============================
exports.protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token provided
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    // User deleted or invalid token
    if (!user) {
      return res.status(401).json({
        message: "User not found for this token",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);

    return res.status(401).json({
      message: "Token invalid or expired",
    });
  }
};

// ===============================
// ROLE-BASED AUTHORIZATION (GENERIC)
// ===============================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

// ===============================
// ROLE-SPECIFIC MIDDLEWARES
// (OPTIONAL BUT CLEAN)
// ===============================

// Admin only
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
  next();
};

// Dealer only
exports.dealerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "dealer") {
    return res.status(403).json({
      message: "Dealer access only",
    });
  }
  next();
};

// Villager only
exports.villagerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "villager") {
    return res.status(403).json({
      message: "Villager access only",
    });
  }
  next();
};
