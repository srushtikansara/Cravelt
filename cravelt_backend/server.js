require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const reservationRoute = require("./routes/reservation");
const restaurantRoutes = require("./routes/restaurantRoutes"); // ← import

const app = express();

// ====== CORS — FIRST ======
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// ====== MIDDLEWARE ======
app.use(express.json());

// ====== DATABASE ======
connectDB();

// ====== ROUTES ======
app.use("/api/auth", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoute);
app.use("/api/restaurants", restaurantRoutes); // ← add this

// ====== TEST ROUTE ======
app.get("/", (req, res) => res.send("Backend running ✅"));

// ====== START SERVER ======
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));