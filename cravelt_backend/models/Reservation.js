const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  request: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);