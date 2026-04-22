import { createContext, useContext, useState, useEffect } from "react";
import { restaurants as restaurantData } from "../data/restraunts";

// ✅ Create Context (ONLY ONCE)
const AppContext = createContext();

// ✅ Provider
function AppProvider({ children }) {
  const API_URL = "https://cravelt.onrender.com/api";

  const [restaurants, setRestaurants] = useState(restaurantData);
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null)
  // 🔥 Load user from localStorage
  useEffect(() => {
  // Ping backend on app load to wake it up
  fetch("https://cravelt.onrender.com/api/users/test")
    .then(r => r.text())
    .then(console.log)
    .catch(console.error);
}, []);
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    const normalizedUser = {
      ...parsedUser,
      id: parsedUser.id || parsedUser._id,
      _id: parsedUser._id || parsedUser.id,
    };
    setUser(normalizedUser);
    setUserId(normalizedUser.id || normalizedUser._id); // ✅ store once

    if (normalizedUser.email === "admin123@gmail.com" || normalizedUser.role === "admin") {
      setRole("admin");
    } else {
      setRole("user");
    }
  }
  setLoading(false);
}, []);

  // 🔥 Fetch favourites
  const fetchFavourites = async (userId) => {
  console.log("fetchFavourites called with userId:", userId);
  try {
    const res = await fetch(`${API_URL}/favourites/user/${userId}`);
    console.log("API response status:", res.status);
    const data = await res.json();
    console.log("API response data:", data);
    setFavourites(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("FAV FETCH ERROR:", err);
  }
};
  // 🔥 Load favourites when user changes
useEffect(() => {
  if (userId) {
    fetchFavourites(userId);
  }
}, [userId]);
  // 🔥 Toggle favourite
  const toggleFavourite = async (restaurant) => {
    const userId =
      user?.id ||
      user?._id ||
      JSON.parse(localStorage.getItem("user"))?.id;

    const restaurantId = String(restaurant?.restaurantId || restaurant?.id || restaurant?._id);
    if (!userId || !restaurantId) return;
     console.log("TOGGLE CALLED");
  console.log("userId:", userId);
  console.log("restaurantId:", restaurantId);
  console.log("restaurant object received:", restaurant);
  console.log("current favourites:", favourites);
    try {
      await fetch(`${API_URL}/favourites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          restaurantId,
          restaurantName: restaurant.name,
        }),
      });

      // 🔥 Instant UI update
      setFavourites((prev) => {
        const exists = prev.some(
          (fav) => String(fav.restaurantId) === String(restaurantId)
        );

        if (exists) {
          return prev.filter(
            (fav) => String(fav.restaurantId) !== String(restaurantId)
          );
        } else {
          return [...prev, { userId, restaurantId }];
        }
      });
    } catch (err) {
      console.error("TOGGLE ERROR:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        restaurants,
        favourites,
        setFavourites,
        toggleFavourite,
        fetchFavourites,
        loading,
        role,
        setRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ✅ Custom Hook
function useApp() {
  return useContext(AppContext);
}

// ✅ Export ONLY ONCE (IMPORTANT FIX)
export { AppProvider, useApp };