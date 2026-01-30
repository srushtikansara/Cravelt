

/* ------------------------------
   Helper: Toast Notification
-------------------------------- */
function showToast(message, duration = 2500) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/* ------------------------------
   Back Button
-------------------------------- */
const backButtons = document.querySelectorAll(".back-btn");
backButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        window.history.back();
    });
});

/* ------------------------------
   Add / Remove Favorites (Toggle)
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const heart = btn.querySelector(".heart");
            if (!heart) return;

            if (heart.innerText === "♡") {
                heart.innerText = "❤️";
                showToast("Added to Favorites");
            } else {
                heart.innerText = "♡";
                showToast("Removed from Favorites");
            }
        });
    });
});

/* ------------------------------
   Review Like Button
-------------------------------- */
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("liked");
    });
});

/* ------------------------------
   Comment Button
-------------------------------- */
const commentButtons = document.querySelectorAll(".comment-btn");
commentButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const comment = prompt("Write your comment:");
        if (comment && comment.trim() !== "") {
            showToast("Comment submitted 💬");
        }
    });
});

/* ------------------------------
   Add Review Form
-------------------------------- */
const reviewForm = document.querySelector("#addReviewForm");
if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Review submitted successfully ⭐");
        reviewForm.reset();
    });
}

/* ------------------------------
   Login / Sign-up Validation
-------------------------------- */
const loginForm = document.querySelector(".auth-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        const inputs = loginForm.querySelectorAll("input");
        let empty = false;
        inputs.forEach(input => {
            if (input.value.trim() === "") empty = true;
        });
        if (empty) {
            e.preventDefault();
            showToast("Please fill all fields ⚠️");
        }
    });
}

/* ------------------------------
   Button Click Animation
-------------------------------- */
const allButtons = document.querySelectorAll("button");
allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("btn-click");
        setTimeout(() => btn.classList.remove("btn-click"), 150);
    });
});

/* ------------------------------
   Fade-in on Scroll (Optional)
-------------------------------- */
const fadeElements = document.querySelectorAll(".fade-in");
const fadeOnScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
};
window.addEventListener("scroll", fadeOnScroll);
fadeOnScroll();

/* ------------------------------
   Search Bar & Filters Functionality
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LOCATION SETUP
  =============================== */

  const LOCATIONS = [
    "Sindhubhavan",
    "Bokadev",
    "Nikol",
    "Satellite",
    "Vaishnodevi"
  ];

  const cards = document.querySelectorAll(".restaurant-card");
  const locationInput = document.getElementById("locationInput");
  const mapFrame = document.querySelector(".map iframe");

  // 🔹 Assign random location to each restaurant
  cards.forEach(card => {
    const randomLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    card.dataset.location = randomLocation.toLowerCase();
  });

  /* ===============================
     FILTERS
  =============================== */

  const checkboxes = document.querySelectorAll(".filters input[type='checkbox']");
  const applyBtn = document.querySelector(".apply-btn");

  checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  applyBtn.addEventListener("click", applyFilters);
  locationInput.addEventListener("input", applyFilters);

  function getCheckedValues(name) {
    return Array.from(
      document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map(cb => cb.value.toLowerCase());
  }

  function applyFilters() {
    const selectedLocation = locationInput.value.trim().toLowerCase();

    const selectedRatings = getCheckedValues("rating").map(Number);
    const selectedPrices = getCheckedValues("price");
    const selectedCuisines = getCheckedValues("cuisine");
    const selectedFood = getCheckedValues("food");
    const selectedAmbience = getCheckedValues("ambience");
    const selectedFacilities = getCheckedValues("facilities");

    cards.forEach(card => {
      let visible = true;

      const rating = parseFloat(card.dataset.rating);
      const price = parseInt(card.dataset.price);

      const cuisine = card.dataset.cuisine.toLowerCase().split(",");
      const food = card.dataset.food.toLowerCase().split(",");
      const ambience = card.dataset.ambience.toLowerCase().split(",");
      const facilities = card.dataset.facilities.toLowerCase().split(",");
      const location = card.dataset.location;

      // 📍 Location
      if (selectedLocation && location !== selectedLocation) {
        visible = false;
      }

      // ⭐ Rating
      if (visible && selectedRatings.length) {
        visible = selectedRatings.some(r => rating >= r);
      }

      // 💰 Price
      if (visible && selectedPrices.length) {
        visible = selectedPrices.some(range => {
          if (range === "200-400") return price >= 200 && price <= 400;
          if (range === "400-600") return price >= 400 && price <= 600;
          if (range === "600+") return price >= 600;
        });
      }

      // 🍽 Cuisine
      if (visible && selectedCuisines.length) {
        visible = selectedCuisines.some(c => cuisine.includes(c));
      }

      // 🥗 Food
      if (visible && selectedFood.length) {
        visible = selectedFood.some(f => food.includes(f));
      }

      // 🛋 Ambience
      if (visible && selectedAmbience.length) {
        visible = selectedAmbience.some(a => ambience.includes(a));
      }

      // 🏪 Facilities
      if (visible && selectedFacilities.length) {
        visible = selectedFacilities.some(f => facilities.includes(f));
      }

      card.style.display = visible ? "block" : "none";
    });

    // 🗺 Update Map
    if (selectedLocation) {
      mapFrame.src = `https://www.google.com/maps?q=${selectedLocation}+restaurants&output=embed`;
    }
  }
});
// ===== SEARCH BAR FUNCTIONALITY =====

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const cards = document.querySelectorAll(".restaurant-card");

// Run search on typing
searchInput.addEventListener("input", applySearch);
locationInput.addEventListener("input", applySearch);

function applySearch() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedLocation = locationInput.value.toLowerCase().trim();

  cards.forEach(card => {
    const name = card.querySelector(".restaurant-name")?.innerText.toLowerCase() || "";
    const cuisine = card.dataset.cuisine?.toLowerCase() || "";
    const food = card.dataset.food?.toLowerCase() || "";
    const ambience = card.dataset.ambience?.toLowerCase() || "";
    const location = card.dataset.location?.toLowerCase() || "";

    let matchesSearch =
      name.includes(searchText) ||
      cuisine.includes(searchText) ||
      food.includes(searchText) ||
      ambience.includes(searchText) ||
      location.includes(searchText);

    let matchesLocation = true;
    if (selectedLocation) {
      matchesLocation = location === selectedLocation;
    }

    card.style.display = (matchesSearch && matchesLocation) ? "block" : "none";
  });
}

