import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./AuthPage.css";
import logo from "../assets/logo.jpeg";
import bg1 from "../assets/bg_dessert.jpeg";
import bg2 from "../assets/pizza.jpeg";
import bg3 from "../assets/coffeee.jpeg";

function AuthPage() {
    const [mode, setMode] = useState("login");
    const [theme, setTheme] = useState("light");
    const [currentBg, setCurrentBg] = useState(0);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const { user, setFavourites, setUser } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ safer fallback
    const from = location.state?.from?.pathname || "/";

    // Background slideshow
    const backgrounds = [bg1, bg2, bg3];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

// inside AuthPage.jsx

const handleAuth = async () => {
  console.log("BUTTON CLICKED ✅");

  try {
    const url =
      mode === "login"
        ? "http://localhost:9999/api/users/login"
        : "http://localhost:9999/api/users";

    const body =
      mode === "login"
        ? { email, password }
        : { fullName: fullName, email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data || "Something went wrong");
      return;
    }

    const userData = data.user ? data.user : data;

    const normalizedUser = {
      id: userData.id,
      name: userData.name || userData.fullName,
      email: userData.email,
      foodPreferences: userData.foodPreferences || [],
    };

    console.log("USER:", normalizedUser);

    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    // ✅ ONLY ONE NAVIGATION
    if (normalizedUser.foodPreferences.length === 0) {
      console.log("➡️ GO TO PREFERENCES");
      navigate("/preferences"); // make sure route matches
    } else {
      console.log("➡️ GO TO DASHBOARD");
      navigate("/dashboard");
    }

  } catch (err) {
    console.error("ERROR:", err);
    alert("Server error");
  }
};
    return (
        <div className={`auth-page ${theme}`}>
            <div className="background-container">
                {backgrounds.map((bg, index) => (
                    <img
                        key={index}
                        src={bg}
                        alt="bg"
                        className={`bg-slide ${index === currentBg ? "active" : ""}`}
                    />
                ))}
                <div className="overlay"></div>
            </div>

            <div className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌞" : "🌙"}
            </div>

            <img src={logo} alt="Logo" className="logo" />

            <div className="auth-card">
                <h2 className="auth-title">{mode === "login" ? "Login" : "Sign Up"}</h2>

                {mode === "signup" && (
                    <div className="floating-label">
                        <input
                            type="text"
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label>Full Name</label>
                    </div>
                )}

                <div className="floating-label">
                    <input
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                </div>

                <div className="floating-label">
                    <input
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>

                <button
                    type="button"  // ✅ prevents accidental form submit reload
                    className={`auth-btn ${theme === "dark" ? "glow" : ""}`}
                    onClick={handleAuth}
                >
                    {mode === "login" ? "Login" : "Sign Up"}
                </button>

                <p
                    className="switch-link"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                >
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <span>{mode === "login" ? "Sign Up" : "Login"}</span>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;