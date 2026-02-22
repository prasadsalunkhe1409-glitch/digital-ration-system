const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// GENERATE TOKEN (include role)
// =======================
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign(
    {
      id: id,
      role: role, // ✅ include role inside token
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );
};

// =======================
// REGISTER USER
// =======================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Register Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =======================
// LOGIN USER WITH ROLE VALIDATION
// =======================
exports.loginUser = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // Check required fields
    if (!role || !email || !password) {
      return res.status(400).json({
        message: "Role, email and password are required",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ✅ ROLE VALIDATION (IMPORTANT)
    if (user.role !== role) {
      return res.status(403).json({
        message: `Access denied. This account is not registered as ${role}`,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
