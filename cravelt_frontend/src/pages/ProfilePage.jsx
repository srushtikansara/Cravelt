import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestrauntCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Heart, Star, Settings, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./ProfilePage.css";
import { restaurants as restaurantData } from "../data/restraunts";

function Profile() {
    const navigate = useNavigate();
    const { user, loading, setUser } = useApp();

    const [restaurants, setRestaurants] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [foodPreferences, setFoodPreferences] = useState([]);
    const [newPreference, setNewPreference] = useState("");
    const [favourites, setFavourites] = useState([]);

    // ✅ Sync user → local state (IMPORTANT FIX)
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setFoodPreferences(user.foodPreferences || []);
        }
    }, [user]);

    // ---------------- FETCH RESTAURANTS ----------------
  useEffect(() => {
    setRestaurants(restaurantData);
}, []);

    // ---------------- FETCH REVIEWS ----------------
    useEffect(() => {
        if (!user) return;

        fetch(`https://cravelt.onrender.com/api/reviews/user/${user.id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((err) => console.error("Error fetching reviews:", err));
    }, [user]);

    // ---------------- FETCH FAVOURITES ----------------
    useEffect(() => {
        if (!user) return;

        fetch(`https://cravelt.onrender.com/api/favourites/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setFavourites(data || []);
            })
            .catch(err => console.error(err));
    }, [user]);

    if (loading) return <div className="p-10 text-center text-xl">Loading profile...</div>;
    if (!user) return <div className="p-10 text-center text-xl">No user found. Please login.</div>;

    // ---------------- NORMALISE FAVOURITES ----------------
    const favouriteRestaurants = restaurants.filter((res) =>
        favourites.some((fav) => fav.restaurantId === String(res.id))
    );
const addPreference = () => {
    if (!newPreference.trim()) return;

    if (!foodPreferences.includes(newPreference.trim())) {
        setFoodPreferences([...foodPreferences, newPreference.trim()]);
    }

    setNewPreference("");
};

const removePreference = (item) => {
    setFoodPreferences(foodPreferences.filter((p) => p !== item));
};
    // ---------------- LOGOUT ----------------
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // ---------------- EDIT PROFILE SAVE ----------------
    const handleEditSave = () => {
        if (editing) {
            setUser({
                ...user,
                name,
                foodPreferences
            });
        }
        setEditing(!editing);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
                <div className="max-w-7xl mx-auto px-4">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-6"
                    >

                        {/* PROFILE PHOTO */}
                        <img
                            src={user.photo || "https://i.pravatar.cc/150"}
                            alt={user.name}
                            className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                        />

                        {/* INFO */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                            <p className="text-white/70 mb-4">{user.email}</p>

                            <div className="flex gap-3 flex-wrap">

                                <div className="bg-white/10 px-4 py-2 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Heart className="text-red-400 w-5 h-5" />
                                        <span>{favourites.length} Favorites</span>
                                    </div>
                                </div>

                                {/* FOOD PREFERENCES */}
                                <div className="bg-white/5 p-4 rounded-2xl">
    <h3 className="font-semibold mb-2">Food Preferences</h3>

    {/* VIEW MODE */}
    {!editing ? (
        <div className="flex flex-wrap gap-2">
            {foodPreferences.length > 0 ? (
                foodPreferences.map((p) => (
                    <span
                        key={p}
                        className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm"
                    >
                        {p}
                    </span>
                ))
            ) : (
                <p className="text-white/60">No preferences</p>
            )}
        </div>
    ) : (
        <>
            {/* ADD INPUT */}
            <div className="flex gap-2 mb-3">
                <Input
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    placeholder="Add preference (e.g. Italian)"
                    className="bg-black/40 text-white"
                />
                <Button onClick={addPreference} className="bg-orange-500">
                    Add
                </Button>
            </div>

            {/* CHIPS WITH REMOVE */}
            <div className="flex flex-wrap gap-2">
                {foodPreferences.map((p) => (
                    <span
                        key={p}
                        className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                        {p}
                        <button
                            onClick={() => removePreference(p)}
                            className="text-red-400 font-bold"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </>
    )}
</div>

                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">

                    {/* FAVOURITES */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Heart className="text-orange-400" />
                            Favorite Restaurants
                        </h2>

                        {favouriteRestaurants?.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {favouriteRestaurants.map((r) => (
                                    <RestaurantCard
                                        key={r.id || r._id}
                                        {...r}
                                        id={r.id || r._id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/5 p-10 rounded-2xl text-center">
                                <p className="text-white/70">No favorites yet</p>
                                <Link to="/search">
                                    <Button className="mt-4 bg-orange-500">
                                        Explore
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* REVIEWS */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Star className="text-yellow-400" />
                            My Reviews
                        </h2>

                        {reviews.length > 0 ? (
                            reviews.map((r) => (
                                <div key={r.id} className="mt-4 bg-white/5 p-4 rounded-xl">
                                    <p className="font-semibold">{r.restaurantId}</p>

                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < r.rating ? "text-yellow-400" : "text-gray-400"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-white/70">{r.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-white/60">No reviews yet</p>
                        )}
                    </section>

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    {/* ACCOUNT */}
                    <div className="bg-white/5 p-6 rounded-2xl">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Settings />
                            Account
                        </h3>

                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            readOnly={!editing}
                            className="bg-black/40 text-white"
                        />

                        <Input
                            value={user.email}
                            readOnly
                            className="bg-black/40 text-white mt-3"
                        />

                        <Button
                            onClick={handleEditSave}
                            className="w-full mt-4 bg-orange-500"
                        >
                            {editing ? "Save" : "Edit Profile"}
                        </Button>
                    </div>

                    {/* LOGOUT */}
                    <Button
                        onClick={handleLogout}
                        className="w-full bg-red-500"
                    >
                        Logout
                    </Button>

                </div>

            </div>

            <Footer />
        </div>
    );
}

export default Profile;