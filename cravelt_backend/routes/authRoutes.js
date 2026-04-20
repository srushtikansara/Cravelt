// authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // If passwords are plaintext
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Send user data (omit password)
    res.json({
      id: user._id,
      fullName: user.fullName || user.name,
      email: user.email,
      favourites: user.favourites || [],
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;