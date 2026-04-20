import RestaurantCard from "./RestrauntCard";
import { useState } from "react";
import {useApp } from "../contexts/AppContext";
function RestaurantSection({ title, data, favourites, setFavourites }) {
    const [selectedDietary, setSelectedDietary] = useState([]);
    const { toggleFavourite } = useApp();
    if (!data || data.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No restaurants found
            </div>
        );
    }

    return (
        <div className="section">
            <h2 className="section-title">{title}</h2>

            <div className="restaurants-grid">
                {data.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        {...restaurant}
                         onFavourite={() => toggleFavourite(restaurant.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default RestaurantSection;