const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const restaurants = await db.collection("restaurants").find().toArray();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Add a restaurant
router.post("/add", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const result = await db.collection("restaurants").insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

module.exports = router;