const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Login route works. Use POST request.");
});

// REGISTER
app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;

    res.json({
        success: true,
        message: "User registered successfully",
        user: { name, email }
    });
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "test@gmail.com" && password === "123456") {
        res.json({
            success: true,
            message: "Login successful",
            token: "fake-jwt-token"
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});