const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

router.post("/add", async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
});

router.get("/", async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

module.exports = router;