use("cravelt");

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
    id: "4",
    name: "Three Quarters Indian Kitchen",
    image: "unt.jpg",
    rating: 3.9,
    location: "Bodakdev Ahmedabad",
    cuisine: "Indian, Chinese",
    price: "₹600 for two",
    lat: 23.0345,
    lng: 72.5091
  },
   {
    id: "5",
    name: "Roast Toast",
    image: "RoastToast.jpeg",
    rating: 4.7,
    location: "Bodakdev Ahmedabad",
    cuisine: "Italian, Continental",
    price: "₹500 for two",
    lat: 23.0345,
    lng: 72.5091
  },
   {
    id: "6",
    name: "Caffeza",
    image: "Caffeza.jpeg",
    rating: 4.2,
    location: "Sindhubhavan Road Ahmedabad",
    cuisine: "Cafe",
    price: "₹400 for two",
    lat: 23.0512,
    lng: 72.5178
  },
  {
    id: "7",
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
    id: "8",
    name: "Cafe de Italiano",
    image: "Cafede.jpeg",
    rating: 4.0,
    location: "Satellite Road Ahmedabad",
    cuisine: "Italian",
    price: "₹600 for two",
    lat: 23.0266,
    lng: 72.5246
  },
  {
    id: "9",
    name: "Dragon Wok",
    image: "Dragon_wok.jpg",
    rating: 3.5,
    location: "Satellite Road Ahmedabad",
    cuisine: "Chinese",
    price: "₹500 for two",
    lat: 23.0280,
    lng: 72.5225
  },
  {
    id: "10",
    name: "Chow Chow",
    image: "chow_chow.jpg",
    rating: 4.1,
    location: "Satellite Road Ahmedabad",
    cuisine: "Chinese",
    price: "₹550 for two",
    lat: 23.0280,
    lng: 72.5225
  },
  {
    id: "11",
    name: "Taranovas Pizza",
    image: "taranovas.jpeg",
    rating: 3.5,
    location: "Prahlad Nagar Ahmedabad",
    cuisine: "Pizza",
    price: "₹1500 for two",
    lat: 23.0120,
    lng: 72.5100
  },
  {
    id: "12",
    name: "Sale & Pepe",
    image: "salepepe.jpeg",
    rating: 4.6,
    location: "Bodakdev Ahmedabad",
    cuisine: "Italian",
    price: "₹1400 for two",
    lat: 23.0345,
    lng: 72.5091
  },
  {
    id: "13",
    name: "La Pino'z Pizza",
    image: "pizza.jpeg",
    rating: 4.2,
    location: "Satellite Road Ahmedabad",
    cuisine: "Pizza",
    price: "₹600 for two",
    lat: 23.0266,
    lng: 72.5246
  },
  {
    id: "14",
    name: "US Pizza",
    image: "pizza_place.jpeg",
    rating: 4.1,
    location: "Prahlad Nagar Ahmedabad",
    cuisine: "Pizza",
    price: "₹500 for two",
    lat: 23.0120,
    lng: 72.5100
  },
  {
    id: "15",
    name: "Lio Pizzeria",
    image: "loi.jpeg",
    rating: 3.4,
    location: "SG Highway Ahmedabad",
    cuisine: "Italian",
    price: "₹1600 for two",
    lat: 23.0600,
    lng: 72.5300
  },
  {
    id: "16",
    name: "Nutsweet",
    image: "nutsweet.jpeg",
    rating: 4.1,
    location: "Satellite Road Ahmedabad",
    cuisine: "Desserts",
    price: "₹600 for two",
    lat: 23.0266,
    lng: 72.5246
  },
  {
    id: "17",
    name: "Snowberry",
    image: "snowberry.jpeg",
    rating: 4.4,
    location: "Bodakdev Ahmedabad",
    cuisine: "Desserts",
    price: "₹500 for two",
    lat: 23.0345,
    lng: 72.5091
  },
  {
    id: "18",
    name: "Moi - The Dessert Studio",
    image: "moi.jpeg",
    rating: 4.7,
    location: "Prahlad Nagar Ahmedabad",
    cuisine: "Desserts",
    price: "₹1000 for two",
    lat: 23.0120,
    lng: 72.5100
  },
  {
    id: "19",
    name: "Huber & Holly",
    image: "huberholly.jpeg",
    rating: 4.5,
    location: "SG Highway Ahmedabad",
    cuisine: "Ice Cream",
    price: "₹600 for two",
    lat: 23.0600,
    lng: 72.5300
  },
  {
    id: "20",
    name: "Cacaoté",
    image: "cacaote.jpg",
    rating: 4.6,
    location: "Bodakdev Ahmedabad",
    cuisine: "Desserts",
    price: "₹900 for two",
    lat: 23.0345,
    lng: 72.5091
  },

  {
    id: "21",
    name: "Balan Dosa",
    image: "street5.jpeg",
    rating: 4.3,
    location: "Maninagar, Ahmedabad",
    cuisine: "South Indian",
    price: "₹200 for two",
    lat: 23.0000,
    lng: 72.6000
  },
  {
    id: "22",
    name: "HL Frankie",
    image: "street3.jpeg",
    rating: 4.4,
    location: "HL College Road, Ahmedabad",
    cuisine: "Street Food",
    price: "₹150 for two",
    lat: 23.0300,
    lng: 72.5500
  },
  {
    id: "23",
    name: "Jay Bhavani Vadapav",
    image: "street1.jpeg",
    rating: 4.5,
    location: "Ahmedabad",
    cuisine: "Street Food",
    price: "₹150 for two",
    lat: 23.0200,
    lng: 72.5700
  },
  {
    id: "24",
    name: "Asharfi Kulfi",
    image: "ashkulfi.jpeg",
    rating: 4.4,
    location: "CG Road Ahmedabad",
    cuisine: "Desserts",
    price: "₹200 for two",
    lat: 23.0250,
    lng: 72.5600
  },
  {
    id: "25",
    name: "Honest Pav Bhaji",
    image: "street4.jpeg",
    rating: 4.5,
    location: "Ahmedabad",
    cuisine: "Street Food",
    price: "₹250 for two",
    lat: 23.0200,
    lng: 72.5700
  },

  {
    id: "26",
    name: "Jani Locho",
    image: "surat1.jpeg",
    rating: 4.6,
    location: "Surat",
    cuisine: "Gujarati",
    price: "₹200 for two",
    lat: 21.1702,
    lng: 72.8311
  },
  {
    id: "27",
    name: "Bhanu Khaman",
    image: "surat1.jpeg",
    rating: 4.6,
    location: "Surat",
    cuisine: "Gujarati",
    price: "₹200 for two",
    lat: 21.1702,
    lng: 72.8311
  },
  {
    id: "28",
    name: "Ganesh Aloo Puri",
    image: "surat2.jpeg",
    rating: 4.5,
    location: "Surat",
    cuisine: "Gujarati",
    price: "₹150 for two",
    lat: 21.1702,
    lng: 72.8311
  },
  {
    id: "29",
    name: "Jamnadas Ghariwala",
    image: "surat5.jpg",
    rating: 4.8,
    location: "Surat",
    cuisine: "Desserts",
    price: "₹500 for two",
    lat: 21.1702,
    lng: 72.8311
  },
  {
    id: "30",
    name: "Spice Terrace",
    image: "surat1.jpeg",
    rating: 4.7,
    location: "Surat",
    cuisine: "North Indian",
    price: "₹4000 for two",
    lat: 21.1702,
    lng: 72.8311
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
// --------------------
// 6. CREATE EMAILS COLLECTION
// --------------------
const emails = [];

allUsers.forEach(user => {
  emails.push({
    userId: user._id,
    email: user.email,
    createdAt: new Date()
  });
});

db.emails.insertMany(emails);
// --------------------
// 7. CREATE MENUS
// --------------------
const menus = [];

restaurants.forEach(r => {
  menus.push(
    {
      restaurantId: r.id,
      category: "Main Course",
      itemName: "Special Thali",
      price: 300 + Math.floor(Math.random() * 500)
    },
    {
      restaurantId: r.id,
      category: "Starters",
      itemName: "Paneer Tikka",
      price: 200 + Math.floor(Math.random() * 200)
    },
    {
      restaurantId: r.id,
      category: "Snacks",
      itemName: "Pani Puri",
      price: 100 + Math.floor(Math.random() * 100)
    },
    {
      restaurantId: r.id,
      category: "Desserts",
      itemName: "Gulab Jamun",
      price: 80 + Math.floor(Math.random() * 100)
    }
  );
});

db.menus.insertMany(menus);