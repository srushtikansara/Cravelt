import PropTypes from "prop-types";
import "./RestaurantCard.css";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext"; // ✅ USE CONTEXT
import Toast from "../components/CustomToast"; // ✅ IMPORT TOAST
import { toast } from "react-hot-toast"; 


function RestaurantCard({
  id,
  image,
  name,
  rating,
  location,
  cuisine,
  price,
  ambience,
  veg,
  menu,
  priceForTwo,
  dietary,
  restaurant, // ✅ PASS RESTAURANT OBJECT
}) {
  const navigate = useNavigate();
  


  const { favourites = [], toggleFavourite, user } = useApp(); // ✅ FROM CONTEXT
  console.log("FAVOURITES:", favourites);
  // ✅ FIXED
const isFavourite =
  Array.isArray(favourites) &&
  favourites.some(
    (fav) => String(fav.restaurantId) === String(id)
  );
  // Compute display price
  const menuPrices = (menu || [])
    .map((item) => item.price)
    .filter(Boolean);

  const startingPrice =
    menuPrices.length > 0 ? Math.min(...menuPrices) : null;


  return (
    <>
    {toast && (
    
    <Toast message={toast} />
 
)}
    <div className="relative card bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">

      {/* IMAGE */}
      <div className="card-img relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        {/* Rating */}
        <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
          ⭐ {rating}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();

            if (!user) {
              toast.error("Login first ❌");
              return;
            }

            if (isFavourite) {
              toast("Removed from favourites ❤️");
            } else {
              toast.success("Added to favourites ❤️");
            }

            toggleFavourite({
              id: id,
              name: name,
            });
          }}
        >
          <span style={{ color: isFavourite ? "red" : "gray" }}>
            {isFavourite ? "❤️" : "🤍"}
  </span>
</button>
      </div>

      {/* CONTENT */}
      <div className="card-content p-4">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          {name}
        </h4>

        <p className="location text-gray-700 dark:text-gray-300 text-sm">
          {location}
        </p>

        {/* TAGS */}
        <div className="card-tags flex gap-2 mt-2 flex-wrap text-xs">
          {(Array.isArray(cuisine) ? cuisine : [cuisine]).map(
            (c, index) =>
              c && (
                <span key={index} className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                  {c}
                </span>
              )
          )}

          {(Array.isArray(ambience) ? ambience : [ambience]).map(
            (a, index) =>
              a && (
                <span key={index} className="bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                  {a}
                </span>
              )
          )}

          {(Array.isArray(dietary) ? dietary : []).map(
            (d, index) =>
              d && (
                <span
                  key={index}
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded"
                >
                  {d}
                </span>
              )
          )}
        </div>

        <p className="price mt-2 font-medium text-black dark:text-white">
          {priceForTwo
            ? `₹${priceForTwo} for two`
            : startingPrice
            ? `Starting from ₹${startingPrice}`
            : price || ""}
        </p>

        {/* VIEW DETAILS */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/restaurant/${id}`);
          }}
          className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View Details
        </button>
      </div>
    </div>
    </>
  );
}

RestaurantCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  cuisine: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ambience: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  veg: PropTypes.bool,
};

export default RestaurantCard;