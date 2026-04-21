const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    location: String,
    rating: { type: Number, min: 0, max: 5 },
    latitude: Number,
    longitude: Number,
    image: String,
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:"Review"}]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);