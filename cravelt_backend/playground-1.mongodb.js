use("cravelt");

// साफ करने के लिए (optional)
db.users.deleteMany({});
db.reviews.deleteMany({});
db.favourites.deleteMany({});
db.restaurants.deleteMany({});

// --------------------
// 1. INSERT RESTAURANTS
// --------------------
db.restaurants.insertMany([
  {
    id: 1,
    name: "Under The Neem Tree",
    type: "Restaurant",
    image: "nt.jpeg",
    images: ["nt.jpeg", "unt.jpg", "underNeem.jpeg", "unt_back.jpeg"],
    rating: 4.9,
    location: "Sindhubhavan, Ahmedabad",
    address: "Sindhubhavan Road, Ahmedabad, Gujarat",
    lat: 23.0512,
    lng: 72.5178,
    phone: "+91 9876543210",
    ambience: "Luxury",
    foodType: "Veg",
    cuisine: "Indian, Continental",
    price: "₹2000 for two",
    description: "Premium fine-dining restaurant offering authentic Indian and continental dishes with luxury ambience.",
    reviews: [
      { user: "Amit", rating: 5, comment: "Absolutely loved the ambience!" },
      { user: "Sneha", rating: 4, comment: "Food quality was amazing." },
      { user: "Rahul", rating: 5, comment: "Best fine dining in Ahmedabad." }
    ]
  },

  {
    id: 2,
    name: "Secret Kitchen",
    type: "Restaurant",
    image: "sk.jpeg",
    images: ["sk.jpeg"],
    rating: 4.4,
    location: "Satellite, Ahmedabad",
    address: "Satellite Road, Ahmedabad",
    lat: 23.0266,
    lng: 72.5246,
    phone: "+91 9123456780",
    ambience: "Family",
    foodType: "Veg,Vegan",
    cuisine: "Indian, Italian",
    price: "₹1700 for two",
    description: "Cozy family restaurant known for delicious Italian and Indian dishes.",
    reviews: [
      { user: "Rahul", rating: 4, comment: "Loved the pasta!" }
    ]
  },

  {
    id: 3,
    name: "@ Mango",
    type: "Restaurant",
    image: "m.jpeg",
    images: ["m.jpeg"],
    rating: 4.8,
    location: "Vaishnodevi, Ahmedabad",
    address: "Vaishnodevi Circle, Ahmedabad",
    lat: 23.1125,
    lng: 72.5483,
    phone: "+91 9988776655",
    ambience: "Family",
    foodType: "Veg",
    cuisine: "Indian, Continental",
    price: "₹1000 for two",
    description: "Modern restaurant serving delicious vegetarian fusion dishes.",
    reviews: []
  },

  {
    id: 4,
    name: "Roast Toast",
    type: "Cafe",
    image: "roast.jpeg",
    images: ["roast.jpeg"],
    rating: 4.7,
    location: "Bodakdev, Ahmedabad",
    address: "Bodakdev, Ahmedabad",
    lat: 23.0345,
    lng: 72.5091,
    phone: "+91 9898989898",
    ambience: "Casual",
    foodType: "Veg,Non-Veg",
    cuisine: "Italian, Continental",
    price: "₹1300 for two",
    description: "Trendy cafe offering continental dishes and coffee delights.",
    reviews: []
  },

  {
    id: 5,
    name: "Little French House",
    type: "Cafe",
    image: "lfh.jpeg",
    images: ["lfh.jpeg"],
    rating: 4.5,
    location: "Nikol, Ahmedabad",
    address: "Nikol, Ahmedabad",
    lat: 23.0789,
    lng: 72.6697,
    phone: "+91 9786543210",
    ambience: "Romantic",
    foodType: "Veg,Non-Veg",
    cuisine: "French, Continental",
    price: "₹1000 for two",
    description: "Charming French-themed cafe with romantic vibe.",
    reviews: []
  },

  {
    id: 6,
    name: "Dragon Wok",
    type: "Restaurant",
    image: "dw.jpeg",
    images: ["dw.jpeg"],
    rating: 4.3,
    location: "Satellite, Ahmedabad",
    address: "Satellite Road, Ahmedabad",
    lat: 23.0280,
    lng: 72.5225,
    phone: "+91 9822113344",
    ambience: "Casual",
    foodType: "Veg,Non-Veg",
    cuisine: "Chinese",
    price: "₹1200 for two",
    description: "Popular Chinese restaurant with spicy flavors.",
    reviews: []
  },

  {
    id: 7,
    name: "Agashiya",
    type: "Restaurant",
    image: "agashiye.jpeg",
    images: ["agashiye.jpeg"],
    rating: 4.9,
    location: "Ellisbridge, Ahmedabad",
    address: "Old City, Ahmedabad",
    lat: 23.0282,
    lng: 72.5821,
    phone: "+91 9989786236",
    ambience: "Luxury",
    foodType: "Veg",
    cuisine: "Gujarati",
    price: "₹1200 for two",
    description: "Authentic Gujarati fine dining experience.",
    reviews: []
  },

  {
    id: 8,
    name: "Banjara",
    type: "Restaurant",
    image: "banjara.jpeg",
    images: ["banjara.jpeg"],
    rating: 4.2,
    location: "Bodakdev, Ahmedabad",
    address: "Sindhubhavan Road, Ahmedabad",
    lat: 23.0397,
    lng: 72.5009,
    phone: "+91 9989786236",
    ambience: "Luxury",
    foodType: "Veg",
    cuisine: "North Indian",
    price: "₹2500 for two",
    description: "Premium North Indian dining experience.",
    reviews: []
  }
]);

// --------------------
// 2. CREATE USERS
// --------------------
const users = [
  { name: "Amit", email: "amit@gmail.com", password: "123456", createdAt: new Date() },
  { name: "Sneha", email: "sneha@gmail.com", password: "123456", createdAt: new Date() },
  { name: "Rahul", email: "rahul@gmail.com", password: "123456", createdAt: new Date() },
  { name: "Priya", email: "priya@gmail.com", password: "123456", createdAt: new Date() }
];

db.users.insertMany(users);

// Fetch users & restaurants
const allUsers = db.users.find().toArray();
const restaurants = db.restaurants.find().toArray();

// --------------------
// 3. CONVERT EXISTING REVIEWS → COLLECTION
// --------------------
const reviewDocs = [];

restaurants.forEach(r => {
  if (r.reviews && r.reviews.length > 0) {
    r.reviews.forEach(rev => {
      const matchedUser = allUsers.find(u => u.name === rev.user);

      if (matchedUser) {
        reviewDocs.push({
          userId: matchedUser._id,
          restaurantId: r.id,
          rating: rev.rating,
          comment: rev.comment,
          createdAt: new Date()
        });
      }
    });
  }
});

db.reviews.insertMany(reviewDocs);

// --------------------
// 4. ADD RANDOM EXTRA REVIEWS
// --------------------
const extraReviews = [];

restaurants.forEach(r => {
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

  extraReviews.push({
    userId: randomUser._id,
    restaurantId: r.id,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    comment: "Nice place, would visit again!",
    createdAt: new Date()
  });
});

db.reviews.insertMany(extraReviews);

// --------------------
// 5. CREATE FAVOURITES
// --------------------
const favourites = [];

allUsers.forEach(user => {
  const shuffled = restaurants.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach(r => {
    favourites.push({
      userId: user._id,
      restaurantId: r.id,
      createdAt: new Date()
    });
  });
});

db.favourites.insertMany(favourites);

// --------------------
// DONE
// --------------------
print("🔥 Full mock data created successfully!");