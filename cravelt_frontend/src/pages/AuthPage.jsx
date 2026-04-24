import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./AuthPage.css";
import logo from "../assets/logo.jpeg";

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
    const bg1 = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600";
const bg2 = "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1600";
const bg3 = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600";
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
  const BASE = "https://cravelt.onrender.com/api";

  const url = mode === "login"
    ? `${BASE}/users/login`
    : `${BASE}/users`;

  const body = mode === "login"
    ? { email, password }
    : { fullName, email, password };

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

const normalizedUser = {
  id: data.id,
  name: data.name,
  email: data.email,
  foodPreferences: data.foodPreferences || [],
  role: data.role || (data.email === "admin123@gmail.com" ? "admin" : "user"), // ✅ add this
};

  console.log("SAVED USER:", normalizedUser); // ✅ verify id is here

  setUser(normalizedUser);
  localStorage.setItem("user", JSON.stringify(normalizedUser));

  // With this:
if (normalizedUser.email === "admin123@gmail.com" || normalizedUser.role === "admin") {
    navigate("/admin");
} else if (normalizedUser.foodPreferences.length === 0) {
    navigate("/preferences");
} else {
    navigate("/");
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