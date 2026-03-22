const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    location: String,
    rating: Number,
    latitude: Number,
    longitude: Number,
    image: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);