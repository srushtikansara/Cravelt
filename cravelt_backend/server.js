const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
let db;

async function connectDB() {
    await client.connect();
    db = client.db("cravelt");
    console.log("Database connected");
}
connectDB();

// ====== TEST ROUTE ======
// This confirms the server is running
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

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
        res.json(result.ops[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add restaurant" });
    }
});

// ====== START SERVER ======
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));