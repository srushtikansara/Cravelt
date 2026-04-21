// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // your modular DB connection
const userRoutes = require("./routes/userRoutes");
const reservationRoute = require("./routes/reservation");
const { MongoClient } = require("mongodb");

const app = express();
const authRoutes = require("./routes/userRoutes"); // or authRoutes.js if separate
app.use("/api/auth", authRoutes);
// ====== DATABASE ======
connectDB();

// If you also want direct access to restaurants collection
let db;
(async () => {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
      useUnifiedTopology: true,
    });
    db = client.db("cravelt"); // your database name
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

// ====== CORS CONFIG ======
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies if needed
  })
);
 // handle preflight requests

// ====== MIDDLEWARE ======
app.use(express.json()); // Parse JSON request body

// ====== USER ROUTES ======
app.use("/api/users", userRoutes);

// ====== RESERVATION ROUTES ======
app.use("/api/reservations", reservationRoute);

// ====== TEST ROUTE ======
app.get("/", (req, res) => res.send("Backend running ✅"));

// ====== RESTAURANT ROUTES ======
// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await db.collection("restaurants").find().toArray();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Add a restaurant
app.post("/api/restaurants/add", async (req, res) => {
  try {
    const result = await db.collection("restaurants").insertOne(req.body);
    res.json({ ...req.body, _id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

// ====== START SERVER ======
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));