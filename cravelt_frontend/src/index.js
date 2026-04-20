import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Import Router
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AppProvider>
            <Router> {/* ✅ Wrap App in Router */}
                <App />
            </Router>
        </AppProvider>
    </React.StrictMode>
);