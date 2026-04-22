import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Menu.css";

export default function Menu() {
  const { restaurantId } = useParams();

  const [menu, setMenu] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // 🌙 SYSTEM THEME DETECTION
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // set initial theme
    setIsDark(mediaQuery.matches);

    // listen for changes
    const handler = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    fetch(`https://cravelt.onrender.com/api/menu/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.log(err));
  }, [restaurantId]);

  if (!menu) return <div className="loading">Loading menu...</div>;

  const items = menu.items || [];

  if (items.length === 0)
    return <div className="empty">No menu available</div>;

  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <div className={`menu-page ${isDark ? "dark" : ""}`}>

      {/* HEADER */}
      <div className="menu-header">
        <div className="menu-header-content">
          <h1>Restaurant Menu</h1>
          <p>Fresh food • Best taste • Premium experience</p>
        </div>
      </div>

      {/* STICKY CATEGORY BAR */}
      <div className="sticky-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className="cat-btn"
            onClick={() =>
              document
                .getElementById(cat)
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU */}
      {categories.map((category) => (
        <motion.div
          key={category}
          id={category}
          className="category-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={`category-banner banner-${category}`}>
            <div className="overlay">
              <h2>{category}</h2>
            </div>
          </div>

          <div className="items-container">
            {grouped[category].map((item) => (
              <motion.div
                key={item.id}
                className="menu-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div>
                  <h3>{item.name}</h3>
                  <span className={item.veg ? "veg" : "nonveg"}>
                    {item.veg ? "🟢 Veg" : "🔴 Non-Veg"}
                  </span>
                </div>

                <div className="price">₹{item.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}