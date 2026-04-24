const mongoose = require("mongoose");

// Reservation.js (MongoDB schema)
const ReservationSchema = new mongoose.Schema({
  restaurantId: { type: String },
  restaurantName: { type: String }, 
  name: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  request: { type: String },
  status: { type: String, default: "PENDING" }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);