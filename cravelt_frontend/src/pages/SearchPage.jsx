import React, { useEffect, useState, useRef, use } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { restaurants as restaurantData } from "../data/restraunts";

// 🔧 Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🎯 Marker icons
const defaultIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const redIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// ✅ MAP CONTROLLER (handles zoom + move)
function MapController({ selectedRestaurant }) {
    const map = useMap();

    useEffect(() => {
        if (!selectedRestaurant) return;

        const lat = Number(selectedRestaurant.lat);
        const lng = Number(selectedRestaurant.lng);

        console.log("MOVING MAP TO:", lat, lng);

        if (!isNaN(lat) && !isNaN(lng)) {
            map.flyTo([lat, lng], 17, {
                animate: true,
                duration: 1.5,
            });
        }
    }, [selectedRestaurant, map]);

    return null;
}
const openInGoogleMaps = (lat, lng) => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
        alert("Invalid location ❌");
        return;
    }

    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank"); // use _blank to open in new tab
};


export default function SearchPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const markerRefs = useRef({});

    // 📡 Fetch data
useEffect(() => {
    setRestaurants(restaurantData);
}, []);


    // 📍 Get user location
    useEffect(() => {
        navigator.geolocation?.getCurrentPosition((pos) => {
            setUserLocation([
                pos.coords.latitude,
                pos.coords.longitude,
            ]);
        });
    }, []);

    // 📍 Open popup when selected
    useEffect(() => {
        console.log("SELECTED:", selectedRestaurant);
        if (
            selectedRestaurant &&
            markerRefs.current[selectedRestaurant.id]
        ) {
            markerRefs.current[selectedRestaurant.id].openPopup();
        }
    }, [selectedRestaurant]);

    // 🔍 Filter
  const filteredRestaurants = Array.isArray(restaurants)
    ? restaurants.filter((r) =>
          r.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
    // ✅ Handle click safely
  const handleRestaurantClick = (r) => {
    console.log("FULL OBJECT:", r);

    const lat = Number(r.lat);
const lng = Number(r.lng);

if (isNaN(lat) || isNaN(lng)) return null; 

    setSelectedRestaurant({
        ...r,
        lat,
        lng,
        _time: Date.now(),
    });
};
console.log("TYPE:", typeof restaurants);
console.log("IS ARRAY:", Array.isArray(restaurants));
console.log("VALUE:", restaurants);
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* LEFT PANEL */}
            <div
                style={{
                    width: "35%",
                    padding: "1rem",
                    overflowY: "auto",
                    borderRight: "1px solid #ddd",
                }}
            >
                <h2>Nearby Restaurants</h2>

               <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    color: "#333",              // ✅ add this
    backgroundColor: "#fff",   // ✅ add this
    fontSize: "1rem",          // ✅ add this
  }}
/>

                {filteredRestaurants.map((r) => (
                    <div
                        key={r.id}
                        onClick={() => handleRestaurantClick(r)}
                        style={{
                            marginBottom: "12px",
                            background: "#1e293b",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={
                                r.image ||
                                r.imageUrl ||
                                r.photo ||
                                (Array.isArray(r.images) ? r.images[0] : "") ||
                                "https://via.placeholder.com/400x300?text=No+Image"
                            }
                            alt={r.name}
                            style={{
                                width: "100%",
                                height: "160px",
                                objectFit: "cover",
                            }}
                            />
                        <div style={{ padding: "10px" }}>
                            <h3>{r.name}</h3>
                            <p>{r.cuisine?.join(", ")}</p>
                            <p>⭐ {r.rating}</p>
                        </div>
                    </div>
                ))}

                {filteredRestaurants.length === 0 && (
                    <p>No restaurants found</p>
                )}
            </div>

            {/* MAP */}
            <div style={{ flex: 1 }}>
                <MapContainer
                    center={[23.03, 72.55]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                     
                    {/* ✅ MOVE MAP */}
                    <MapController selectedRestaurant={selectedRestaurant} />

                    {/* 📍 USER LOCATION */}
                    {userLocation && (
                        <Marker position={userLocation}   eventHandlers={{
        click: () => openInGoogleMaps(userLocation[0], userLocation[1]),
    }}>
                            <Popup>You are here</Popup>
                        </Marker>
                    )}

                    {/* 📍 RESTAURANTS */}
                    {(filteredRestaurants || []).map((r) => {
                        const lat = parseFloat(r.lat);
                        const lng = parseFloat(r.lng);

                        if (isNaN(lat) || isNaN(lng)) return null;

                        const isSelected =
                            selectedRestaurant?.id === r.id;

                        return (
                         <Marker
  key={r.id}
  position={[lat, lng]}
  icon={isSelected ? redIcon : defaultIcon}
  ref={(ref) => {
    if (ref) markerRefs.current[r.id] = ref;
  }}
  eventHandlers={{
   click: () => handleRestaurantClick(r)
  }}
>
  <Tooltip>{r.name}</Tooltip>
  <Popup>
  <h4>{r.name}</h4>
  <p>⭐ {r.rating}</p>
  <p>{r.cuisine?.join(", ")}</p>
  <button
    onClick={() => openInGoogleMaps(lat, lng)}
    style={{
      padding: "6px 12px",
      marginTop: "6px",
      cursor: "pointer",
    }}
  >
    Open in Google Maps
  </button>
</Popup>
</Marker>
                        );
                    })}
                </MapContainer>
               
            </div>
        </div>
    );
}