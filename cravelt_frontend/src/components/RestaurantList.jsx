import React, { useState, useEffect } from "react";
import Filters, { priceRanges } from "./Filters";
import { restaurants } from "../data/restaurants";

function getAvgPrice(r) {
    if (!r.menu || r.menu.length === 0) return 0;
    const total = r.menu.reduce((sum, item) => sum + (item.price || 0), 0);
    return total / r.menu.length;
}

function RestaurantList() {
    const [filters, setFilters] = useState({
        ratings: [],
        cuisines: [],
        ambience: [],
        dietary: [],
        priceRange: [],
    });

    const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

    const hasActiveFilters =
        (filters.ratings || []).length > 0 ||
        (filters.cuisines || []).length > 0 ||
        (filters.ambience || []).length > 0 ||
        (filters.dietary || []).length > 0 ||
        (filters.priceRange || []).length > 0;

    useEffect(() => {
        if (!hasActiveFilters) {
            setFilteredRestaurants(restaurants);
            return;
        }

        const filtered = restaurants.filter((r) => {
            const ratingMatch =
                (filters.ratings || []).length > 0 &&
                filters.ratings.some((rating) => r.rating >= rating);

            const cuisineMatch =
                (filters.cuisines || []).length > 0 &&
                r.cuisine.some((c) => filters.cuisines.some((fc) => fc.toLowerCase() === c.toLowerCase()));

            const ambienceMatch =
                (filters.ambience || []).length > 0 &&
                r.ambience.some((a) => filters.ambience.some((fa) => fa.toLowerCase() === a.toLowerCase()));

            const dietaryMatch =
                (filters.dietary || []).length > 0 &&
                r.dietary.some((d) => filters.dietary.some((fd) => fd.toLowerCase() === d.toLowerCase()));

            const avgPrice = getAvgPrice(r);
            const priceMatch =
                (filters.priceRange || []).length > 0 &&
                filters.priceRange.some((label) => {
                    const range = priceRanges.find((pr) => pr.label === label);
                    return range && avgPrice >= range.min && avgPrice <= range.max;
                });

            return ratingMatch || cuisineMatch || ambienceMatch || dietaryMatch || priceMatch;
        });

        setFilteredRestaurants(filtered);
    }, [filters, hasActiveFilters]);

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <Filters
                filters={filters}
                setFilters={setFilters}
            />

            <div style={{ flex: 1 }}>
                {filteredRestaurants.length === 0 ? (
                    <p>No restaurants match your filters.</p>
                ) : (
                    filteredRestaurants.map((r) => (
                        <div key={r.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <img src={r.image} alt={r.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                            <h3>{r.name}</h3>
                            <p>Rating: {r.rating}</p>
                            <p>Cuisine: {r.cuisine.join(", ")}</p>
                            <p>Ambience: {r.ambience.join(", ")}</p>
                            <p>Dietary: {r.dietary.join(", ")}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RestaurantList;