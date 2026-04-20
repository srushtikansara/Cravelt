const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

// ✅ Test route
router.get("/", (req, res) => {
    res.send("User routes working ✅");
});

console.log("UserRoutes loaded ✅");

// =====================================================
// ❤️ ADD TO FAVORITES
// =====================================================
router.post("/:userId/favorite", async (req, res) => {
    try {
        const { userId } = req.params;
        const { restaurantId } = req.body;

        if (!restaurantId) {
            return res.status(400).json({ error: "restaurantId is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const alreadyFavorite = user.favourites.some(
            fav => fav.toString() === restaurantId
        );

        if (!alreadyFavorite) {
            user.favourites.push(restaurantId);

            user.log.push({
                action: "add_favorite",
                timestamp: new Date()
            });

            await user.save();
        }

        res.json({
            message: alreadyFavorite
                ? "Already in favorites"
                : "Added to favorites",
            favourites: user.favourites
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// =====================================================
// ❌ REMOVE FROM FAVORITES (VERY IMPORTANT)
// =====================================================
router.delete("/:userId/favorite/:restaurantId", async (req, res) => {
    try {
        const { userId, restaurantId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.favourites = user.favourites.filter(
            fav => fav.toString() !== restaurantId
        );

        user.log.push({
            action: "remove_favorite",
            timestamp: new Date()
        });

        await user.save();

        res.json({
            message: "Removed from favorites",
            favourites: user.favourites
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// =====================================================
// 👤 GET USER PROFILE (FAVORITES + REVIEWS)
// =====================================================
router.get("/:userId/profile", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate("favourites")
            .populate({
                path: "reviews",
                populate: {
                    path: "restaurant",
                    select: "name location"
                }
            });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// =====================================================
// 📜 USER LOGS
// =====================================================
router.get("/:userId/logs", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.log);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// =====================================================
// ⭐ ADD REVIEW
// =====================================================
router.post("/:userId/review", async (req, res) => {
    try {
        const { userId } = req.params;
        const { restaurantId, rating, comment } = req.body;

        const review = new Review({
            user: userId,
            restaurant: restaurantId,
            rating,
            comment
        });

        await review.save();

        // Link to user
        await User.findByIdAndUpdate(userId, {
            $push: { reviews: review._id }
        });

        res.json({ message: "Review added", review });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
// ==================== LOGIN ROUTE ====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // ⚠️ Use bcrypt.compare if passwords are hashed in DB
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Return user data without password
    const userData = {
      id: user._id,
      fullName: user.fullName || user.name,
      email: user.email,
      favourites: user.favourites || [],
    };

    res.json(userData);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});