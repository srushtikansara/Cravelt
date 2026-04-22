import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import Footer from "../components/Footer";
import { Star, Heart, Navigation } from "lucide-react";
import { useState,useEffect } from "react";
import "../pages/ViewDetails.css";
import { QRCodeCanvas } from "qrcode.react";
import BookTableForm from "../pages/BookTableForm";

export default function ViewDetails() {
  const { id } = useParams();
  const { restaurants, favourites = [], toggleFavourite, user } = useApp();
  
  const restaurant = restaurants?.find(
  r => String(r.id) === String(id)
);
  const [showBookTableForm, setShowBookTableForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [userName, setUserName] = useState("");
 const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "https://cravelt-nine.vercel.app";
  useEffect(() => {
  if (!id) return;

  fetch(`https://cravelt.onrender.com/api/reviews/${id}`)
    .then((res) => res.json())
    .then((data) => setReviews(data))
    .catch(console.error);
}, [id]);
  if (!restaurant) {
    return (
      <div className="view-details-page">
        <h2>Restaurant not found</h2>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  const isFavourite = favourites?.some(
  (f) => String(f.restaurantId || f) === String(restaurant.id)
);

const handleReviewSubmit = async () => {
  console.log("SUBMIT CLICKED");

  if (!comment.trim()) {
    alert("Please write a review");
    return;
  }

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const reviewData = {
      userId: user.id,            // ✅ VERY IMPORTANT
      userName: user.name,        // ✅ for display
      restaurantId: restaurant.id,
      comment: comment,
      rating: rating,
      date: new Date().toLocaleDateString()
    };
    const res = await fetch("https://cravelt.onrender.com/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  userId: user.id,
  restaurantId: restaurant.id,
  rating,
  comment
}),
    });

    const data = await res.json();
    console.log("RESPONSE DATA:", data);

    if (res.ok) {
      alert("Review added successfully!");

      // ✅ instantly update UI
      setReviews((prev) => [...prev, data]);

      setComment("");
      setRating(5);
      setShowReviewForm(false);
    } else {
      console.error("BACKEND ERROR:", data);
      alert("Failed to add review");
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    alert("Server error");
  }
};
const getAmenityIcon = (item) => {
  switch (item.toLowerCase()) {
    case "wifi":
      return "📶";
    case "parking":
      return "🚗";
    case "air conditioning":
    case "ac":
      return "❄️";
    case "family seating":
      return "👨‍👩‍👧‍👦";
    case "outdoor seating":
      return "🌿";
    case "takeaway":
      return "🥡";
    default:
      return "✔️";
  }
};

  return (
    <div className="view-details-page">

      {/* HERO IMAGE */}
      {/* HERO IMAGE */}
      <div
        className="restaurant-header"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <h1>{restaurant.name}</h1>
        <Link to="/" className="back-btn">← Back</Link>
      </div>

      {/* RESTAURANT DESCRIPTION */}
<div className="description-card">
  <p>{restaurant.description}</p>
</div>

      {/* CONTACT & ACTIONS ROW */}
      <div className="contact-rating-section">
        <div className="contact-info flex gap-6 items-center flex-wrap">
          <p>Price for two : ₹{restaurant.priceForTwo}</p>
          <p>Phone: {restaurant.phone}</p>
          <p>Open: {restaurant.hours}</p>

         <button
  className="share-btn"
  onClick={() => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `Check out ${restaurant.name}`,
        url: url,
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
    }
  }}
>
  Share
</button>
        </div>

        <div className="ratings-fav flex gap-4 items-center flex-wrap">
          <p>
            <Star className="inline w-5 h-5 text-yellow-400" /> {restaurant.rating} Reviews
          </p>
          <p>
  🌍 {restaurant.googleRating || "4.5"} Google
</p>

    <button
  onClick={() => toggleFavourite(restaurant)}   // 🔥 PASS FULL OBJECT
  className="favourite-btn"
>
  <Heart
    className={`w-6 h-6 transition duration-200 ${
      isFavourite ? "text-red-500 scale-110" : "text-gray-400"
    }`}
  />
</button>
            <button
  className="add-review-btn mt-4"
 
  onClick={() => {

    setShowBookTableForm(true)}}
>
  Book Table
</button>
        </div>
      </div>

      {/* GALLERY / PHOTOS BELOW CONTACT ROW */}
      <div className="restaurant-gallery">
  {(restaurant.photos || [restaurant.image]).map((photo, idx) => (
    <img
      key={idx}
      src={photo}
      alt={`restaurant-${idx}`}
      style={{
        width: "180px",
        height: "130px",
        objectFit: "cover",
        borderRadius: "12px",
        marginRight: "10px",
      }}
    />
  ))}
</div>
     
      {/* REVIEWS & MAP */}
      <div className="reviews-map-section">

        {/* LEFT: Tabs + Content */}
        <div className="reviews-left">

          {/* TABS */}
          <div className="restaurant-description">
            <div className="tabs">
              {["overview", "menu", "reviews"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                 className={activeTab === tab ? "active" : ""}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="tab-content mt-4">

              {/* OVERVIEW */}
{activeTab === "overview" && (
  <div className="overview-section">

    {/* FEATURES */}
    <h2 className="section-title">✨ People Say This Place Is Known For</h2>

    <div className="features-list">
      {restaurant.features?.map((f, idx) => (
        <span key={idx} className="feature-badge">
          {f}
        </span>
      ))}
    </div>

    {/* MORE INFO */}
    <h2 className="section-title mt-4">📌 More Info</h2>

    <div className="info-grid">
      <div><strong>🍽 Lunch:</strong> {restaurant.lunch || "Available"}</div>
      <div><strong>🌙 Dinner:</strong> {restaurant.dinner || "Available"}</div>
      <div><strong>🚚 Home Delivery:</strong> {restaurant.homeDelivery ? "Yes" : "No"}</div>
      <div><strong>🥡 Takeaway:</strong> {restaurant.takeaway ? "Yes" : "No"}</div>
      <div><strong>🥗 Vegetarian:</strong> {restaurant.vegetarian ? "Yes" : "No"}</div>
    </div>

    {/* AMENITIES */}
    <h2 className="section-title mt-4">🛎 Amenities</h2>

    <div className="amenities-list">
      {restaurant.amenities?.map((item, idx) => (
        <div key={idx} className="amenity-item">
          {getAmenityIcon(item)}
          <span>{item}</span>
        </div>
      ))}
    </div>

  </div>
)}
              {/* MENU */}
{/* MENU */}
{activeTab === "menu" && (
  <div className="qr-section">

    <div className="qr-card">
      
      <h2 className="qr-title">Digital Menu</h2>

      <p className="qr-subtitle">
        Scan this QR code to explore the full restaurant menu
      </p>

      <div className="qr-box">
        <QRCodeCanvas
          value={`https://${FRONTEND_URL}/menu/${restaurant.id}`}
          size={180}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="qr-hint">
        Or open directly in browser
      </p>

      <a
        className="qr-link"
        href={`/menu/${restaurant.id}`}
        target="_blank"
        rel="noreferrer"
      >
        View Menu Page →
      </a>

    </div>

  </div>
)}
              <div>
                   {showBookTableForm && (
  <BookTableForm
    restaurantName={restaurant.name}
    restaurantId={restaurant.id}
    onClose={() => setShowBookTableForm(false)}
  />
)}
              </div>
               <p className="text-lg font-semibold">
  ⭐ {reviews.length > 0
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
    : "No ratings"}
</p>
              {/* REVIEWS */}
              {activeTab === "reviews" && (
                <div>
                  <button
                    className="add-review-btn"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    Add Review
                  </button>
                 
                  {showReviewForm && (
  <div className="user-review mt-4">

    <textarea
      placeholder="Write your review..."
      rows={4}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
<div className="stars">
  {[1,2,3,4,5].map(n => (
    <Star
      key={n}
      className={`w-6 h-6 cursor-pointer ${
        n <= rating ? "text-yellow-400" : "text-gray-300"
      }`}
      onClick={() => setRating(n)}
    />
  ))}
</div>

    <button className="submit-review-btn" onClick={handleReviewSubmit}>
      Submit Review
    </button>
  </div>
)}

                  {reviews.map(r => (
                    <div key={r.id} className="user-review mt-2 p-3 bg-white rounded-lg shadow">
                      <p><strong>
  {r.userId === user?.id ? "You" : r.userName}
</strong> - {new Date(r.createdAt || r.date || Date.now()).toLocaleDateString()}</p>
                      <p>{[...Array(5)].map((_, i) => (
                        <Star key={i} className={`inline w-4 h-4 ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`} />
                      ))}</p>
                      <p>{r.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
  <p className="text-gray-400 mt-2">No reviews yet</p>
)}
                </div>
              )}
             
            </div>
          </div>

        </div>

        {/* RIGHT: Map */}
        <div className="map-right">
          <iframe
            title="map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
          />
          <button
            className="add-review-btn mt-2"
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`, "_blank")}
          >
            <Navigation className="inline w-5 h-5 mr-1" /> Get Directions
          </button>
        </div>

      </div>

      {/* SIMILAR RESTAURANTS */}
           <div className="similar-restaurants">
  <h2>Similar Restaurants</h2>

  <div className="similar-cards">
    {restaurants
      .filter((r) => {
        if (r.id === restaurant.id) return false;

        // match category
        const sameCategory = r.category === restaurant.category;

        // match cuisine
        const sameCuisine = r.cuisine?.some(c =>
          restaurant.cuisine?.includes(c)
        );

        // match ambience
        const sameAmbience = r.ambience?.some(a =>
          restaurant.ambience?.includes(a)
        );

        return sameCategory || sameCuisine || sameAmbience;
      })
      .slice(0, 4)
      .map((r) => (
        <div
          key={r.id}
          className="similar-card"
          onClick={() => window.location.href = `/restaurant/${r.id}`}
        >
          <img src={r.image} alt={r.name} />
          <p>{r.name}</p>
        </div>
      ))}
  </div>
</div>

      <Footer />
    </div>
  );
}