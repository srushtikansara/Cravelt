import { useState, useEffect } from "react";
import { useApp } from "../contexts/AppContext";
import RestaurantCard from "../components/RestaurantCard";
 function Favourites() {
    const { user, favourites, fetchFavourites } = useApp();

    useEffect(() => {
        if (!user?._id) return;
        fetchFavourites(user._id);
    }, [user]);

    return (
        <div style={{ padding: "30px" }}>
            <h2>❤️ Your Favourites</h2>

            {favourites.length === 0 ? (
                <p>No favourites added yet.</p>
            ) : (
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {favourites.map((fav) => (
                        <RestaurantCard
                            key={fav.restaurantId}
                            id={fav.restaurantId}
                            name={fav.restaurantName}
                            restaurant={fav}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Favourites;