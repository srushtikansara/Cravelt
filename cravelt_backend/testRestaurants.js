const axios = require("axios");

// Your backend endpoint
const API_URL = process.env.API_URL || "http://127.0.0.1:9999/api/restaurants";

// aiSearch function from your aisearch.ts
function aiSearch(query, restaurants) {
    const q = query.toLowerCase();
    return restaurants.filter((r) => {
        const text = [
            r.name,
            ...(r.cuisine ? r.cuisine.split(",") : []),
            ...(r.ambience ? [r.ambience] : []),
            ...(r.tags || []),
            ...(r.features || []),
            ...(r.dietary ? r.dietary.split(",") : [])
        ].join(" ").toLowerCase();
        return text.includes(q);
    });
}

async function testRestaurants() {
    try {
        // Fetch all restaurants
        const res = await axios.get(API_URL);
        const restaurants = res.data;
        console.log("Total restaurants:", restaurants.length);

        // List all names
        restaurants.forEach(r => console.log("-", r.name));

        // Test aiSearch
        const searchQuery = "pizza"; // example query
        const searchResults = aiSearch(searchQuery, restaurants);
        console.log(`\nSearch results for "${searchQuery}":`);
        searchResults.forEach(r => console.log("-", r.name));
    } catch (err) {
        console.error("Error fetching restaurants:", err.message);
    }
}

testRestaurants();