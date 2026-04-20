import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Filters, { priceRanges } from "../components/Filters";
import RestaurantSection from "../components/RestaurantSection";
import Footer from "../components/Footer";
import "./Home.css";
import { useApp } from "../contexts/AppContext";

import dessert from "../assets/dessert.jpeg";
import pasta from "../assets/pasta.jpeg";
import indianFood from "../assets/Indianfood.jpg.jpeg";
import chineseFood from "../assets/Chinesefood.jpg.jpeg";
import foodies from "../assets/foodies.jpeg";

function Home() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [toast, setToast] = useState("");
  const { restaurants, user } = useApp();
  // ✅ FIX 1: only take what you need
  const { favourites, toggleFavourite } = useApp();
  const [searchText, setSearchText] = useState("");
  // ❌ REMOVE THIS (id doesn't exist here)
  // const isFavourite = (favorites || []).includes(id);
  const safeLower = (value) => {
  if (typeof value === "string") return value.toLowerCase();
  if (Array.isArray(value)) return value.join(" ").toLowerCase();
  if (typeof value === "object" && value !== null)
    return (value.name || "").toLowerCase();
  return "";
};
  // Slideshow
  const images = [dessert, pasta, indianFood, chineseFood, foodies];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent(prev => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);
   
  // Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => console.log("Location permission denied")
      );
    }
  }, []);

  // FILTER STATES
  const [filtersState, setFiltersState] = useState({
    ratings: [],
    cuisines: [],
    ambience: [],
    dietary: [],
    priceRange: [],
  });

  const [appliedFilters, setAppliedFilters] = useState(filtersState);
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    restaurants || []
  );

  // Apply/Clear filters
  const handleApplyFilters = () => setAppliedFilters(filtersState);
  const handleClearFilters = () => {
    const emptyFilters = {
      ratings: [],
      cuisines: [],
      ambience: [],
      dietary: [],
      priceRange: [],
    };
    setFiltersState(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  useEffect(() => {
    const result = restaurants.filter((r) => {
      if (!r) return false;

      const query = (searchText || "").toLowerCase();

      const cuisineArr = Array.isArray(r.cuisine)
        ? r.cuisine
        : r.cuisine
        ? [r.cuisine]
        : [];
      const ambienceArr = Array.isArray(r.ambience)
        ? r.ambience
        : r.ambience
        ? [r.ambience]
        : [];
      const dietaryArr = Array.isArray(r.dietary)
        ? r.dietary
        : r.dietary
        ? [r.dietary]
        : [];
      const tagsArr = Array.isArray(r.tags)
        ? r.tags
        : r.tags
        ? [r.tags]
        : [];

      const searchMatch =
        !query ||
        (r.name && r.name.toLowerCase().includes(query)) ||
        (r.address && r.address.toLowerCase().includes(query)) ||
        cuisineArr.some((c) => c.toLowerCase().includes(query)) ||
        tagsArr.some((t) => t.toLowerCase().includes(query));

      if (!searchMatch) return false;

      const ratingMatch =
        appliedFilters.ratings.length === 0 ||
        (typeof r.rating === "number" &&
          appliedFilters.ratings.some((f) => r.rating >= f));
const cuisineMatch =
  appliedFilters.cuisines.length === 0 ||
  cuisineArr.some(c =>
    appliedFilters.cuisines
      .map(x => x.toLowerCase())
      .includes(c.toLowerCase())
  );

      const ambienceMatch =
        appliedFilters.ambience.length === 0 ||
        ambienceArr.some((a) => appliedFilters.ambience.includes(a));

      const dietaryMatch =
  appliedFilters.dietary.length === 0 ||
  dietaryArr.some((d) =>
    appliedFilters.dietary
      .map(x => x.toLowerCase())
      .includes(d.toLowerCase())
  );

      const priceMatch =
        appliedFilters.priceRange.length === 0 ||
        appliedFilters.priceRange.some((label) => {
          const range = priceRanges.find((pr) => pr.label === label);
          return (
            range &&
            r.priceForTwo >= range.min &&
            r.priceForTwo <= range.max
          );
        });

      return (
        ratingMatch &&
        cuisineMatch &&
        ambienceMatch &&
        dietaryMatch &&
        priceMatch
      );
    });

    setFilteredRestaurants(result);
  }, [appliedFilters, searchText]);

  // Sections
 const recommended = filteredRestaurants.filter((r) => {
  if (!user?.foodPreferences?.length) return false;

  const matchCuisine = r.cuisine?.some(c =>
    user.foodPreferences
      .map(p => p.toLowerCase())
      .includes(c.toLowerCase())
  );

  const goodRating = r.rating >= 4;

  return matchCuisine && goodRating;
});
const score = (r) => {
  let s = 0;

  if (r.cuisine?.some(c =>
    user?.foodPreferences?.includes(c)
  )) s += 2;

  if (r.rating >= 4.5) s += 2;
  else if (r.rating >= 4) s += 1;

  return s;
};

const finalRecommended = [...filteredRestaurants]
  .sort((a, b) => score(b) - score(a))
  .slice(0, 6);
 const generalRestaurants = filteredRestaurants.filter(
  (r) =>
    ![
      "cafe",
      "cafes",
      "chinese",
      "pizza",
      "dessert",
      "desserts",
      "street food",
      "gujarati",
      "south indian",
    ].includes(safeLower(r.category))
);
  const cafes = filteredRestaurants.filter((r) =>
  ["cafe", "cafes"].includes(safeLower(r.category))
);

  const chinese = filteredRestaurants.filter(
  (r) => safeLower(r.category) === "chinese"
);

  const pizza = filteredRestaurants.filter(
    (r) => safeLower(r.category) === "pizza"
  );

  const desserts = filteredRestaurants.filter((r) =>
    ["dessert", "desserts"].includes(
      safeLower(r.category)
    )
  );
  const gujarati = filteredRestaurants.filter(
    (r) => safeLower(r.category) === "gujarati"
  );
  const southIndian = filteredRestaurants.filter(
    (r) => safeLower(r.category) === "south indian"
  );
const streetFood = filteredRestaurants.filter((r) =>
  ["street food", "streetfood"].includes(safeLower(r.category))
);
  const vegRestaurants = filteredRestaurants.filter((r) =>
  r.dietary?.includes("veg")
);

  return (
    <div className="home bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">

      {/* HERO */}
      <div className="relative h-[400px] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="food"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold mb-4">
            Discover Amazing Restaurants
          </h1>

          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-3 rounded-lg border w-80 text-black dark:text-black"
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="main-container flex flex-col md:flex-row gap-6 p-4">

        {/* FILTERS */}
        <div className="filters-container w-full md:w-60 flex-shrink-0">
          <Filters
            filters={filtersState}
            setFilters={setFiltersState}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* RESTAURANTS */}
        <div className="restaurants-container flex-1 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-4">

          {filteredRestaurants.length === 0 && (
            <p className="p-4 text-center">No restaurants found 😢</p>
          )}

          {/* ✅ FIX 2: remove favourites + toggle props */}
          <RestaurantSection title="✨ Recommended for You" data={finalRecommended} />
          <RestaurantSection title="Restaurants" data={generalRestaurants} />
          <RestaurantSection title="Cafes" data={cafes} />
          <RestaurantSection title="Chinese" data={chinese} />
          <RestaurantSection title="Pizza" data={pizza} />
          <RestaurantSection title="Desserts" data={desserts} />
          <RestaurantSection title="Gujarati" data={gujarati} />
          <RestaurantSection title="South Indian" data={southIndian} />
          <RestaurantSection title="Street Food" data={streetFood} />
          
        </div>
      </div>
     {toast && (
  <div className="fixed left-5 top-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
    {toast}
  </div>
)}

      {/* LOCATION */}
      <div className="location-section bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mt-4">
        <h2>Your Current Location</h2>

        {location ? (
          <>
            <p>
              Lat: {location.lat} | Lng: {location.lng}
            </p>

            <iframe
              title="map"
              width="100%"
              height="300"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            />
          </>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;