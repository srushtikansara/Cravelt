import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Bot, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useApp } from "../contexts/AppContext";
import { useState } from "react";

export function Navigation() {

    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, setUser, role } = useApp();
    const { favourites = [] } = useApp();    
    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const handleProtectedNav = (path) => {
        if (!user && (path === "/profile" || path === "/ai-advisor")) {
            navigate("/auth", {
                state: { from: path }
            });
            return;
        }
        navigate(path);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🍽️
                        </div>
                        <span className="text-2xl font-bold text-orange-500">
                            Cravelt
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-4">
                        {[
                            { path: "/", label: "Dashboard", icon: Home },
                            { path: "/search", label: "Search", icon: Search },
                            { path: "/ai-advisor", label: "AI Advisor", icon: Bot },
                            { path: "/profile", label: "Profile", icon: User },
                        ].map(({ path, label, icon: Icon }) => (
                            <button
                                key={path}
                                onClick={() => handleProtectedNav(path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive(path)
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">

                        {/* 🌗 Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-800" />
                            )}
                        </button>

                        {/* 👤 User */}
                        {user ? (
                            <div className="navbar-user flex items-center gap-3">

                                <Link to="/profile" className="flex items-center gap-2">
                                    <img
                                        src={user.photo || "https://i.pravatar.cc/40"}
                                        alt="user"
                                        className="w-10 h-10 rounded-full border"
                                    />
                                    <span>{user?.name || "User"}</span>
                                      <span>❤️ {favourites?.length || 0}</span>
                                </Link>
                                   {role === "admin" && (
  <div className="flex gap-2">
    <button
      onClick={() => navigate("/admin/menu/1")}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
    >
      Admin Menu
    </button>
    <button
      onClick={() => navigate("/admin/reservations")}
      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
    >
      Reservations
    </button>
  </div>
)}

                            
                                <button
                                    onClick={() => {
                                         localStorage.removeItem("user");
                                        setUser(null); // ✅ updates whole app instantly
                                        navigate("/");
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <Link to="/auth">
                                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                    Login
                                </button>
                            </Link>
                        )}

                    </div>

                </div>
            </div>

        </nav>
    );
}