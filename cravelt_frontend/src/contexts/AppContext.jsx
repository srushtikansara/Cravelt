import { createContext, useContext, useState, useEffect } from "react";
import { restaurants as restaurantData } from "../data/restraunts";

// ✅ Create Context (ONLY ONCE)
const AppContext = createContext();

// ✅ Provider
function AppProvider({ children }) {
  const API_URL = "http://localhost:9999/api";

  const [restaurants, setRestaurants] = useState(restaurantData);
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  // 🔥 Load user from localStorage
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

    // 🔥 ADMIN LOGIC
    if (normalizedUser.email === "admin123@gmail.com" ||
  normalizedUser.role === "admin") {
      setRole("admin");
    } else {
      setRole("user");
    }
  }

  setLoading(false);
}, []);

  // 🔥 Fetch favourites
  const fetchFavourites = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/favourites/user/${userId}`);
      const data = await res.json();

      setFavourites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FAV FETCH ERROR:", err);
    }
  };

  // 🔥 Load favourites when user changes
  useEffect(() => {
    const userId =
      user?.id ||
      user?._id ||
      JSON.parse(localStorage.getItem("user"))?.id;

    if (userId) {
      fetchFavourites(userId);
    }
  }, [user]);

  // 🔥 Toggle favourite
  const toggleFavourite = async (restaurant) => {
    const userId =
      user?.id ||
      user?._id ||
      JSON.parse(localStorage.getItem("user"))?.id;

    const restaurantId = String(restaurant?.id || restaurant?._id);

    if (!userId || !restaurantId) return;

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