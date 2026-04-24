import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { Button } from "../components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function FoodPreferences() {
    const navigate = useNavigate();
    const { user, setUser } = useApp();
    const { role } = useApp();

    
   const [selectedPreferences, setSelectedPreferences] = useState(
    new Set(user?.foodPreferences || [])
);
    useEffect(() => {
  if (role === "admin") {
    navigate("/admin");
  }
}, [role]);
   
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const preferences = [
        { name: "Indian", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400", color: "from-orange-600 to-red-600" },
        { name: "Chinese", image: "https://images.unsplash.com/photo-1628591697390-ce94ea55fe12?w=400", color: "from-red-600 to-orange-600" },
        { name: "Italian", image: "https://images.unsplash.com/photo-1692025690885-736a2cf8eae4?w=400", color: "from-green-600 to-red-600" },
        { name: "Street Food", image: "https://images.unsplash.com/photo-1621334953333-ba703fcb434d?w=400", color: "from-orange-500 to-pink-600" },
        { name: "Desserts", image: "https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?w=400", color: "from-pink-500 to-purple-600" },
        { name: "Cafe", image: "https://images.unsplash.com/photo-1683771419437-b7c593059d95?w=400", color: "from-amber-600 to-orange-600" },
        { name: "Pizza", image: "https://images.unsplash.com/photo-1692025690885-736a2cf8eae4?w=400", color: "from-orange-600 to-red-500" },
        { name: "South Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", color: "from-green-600 to-emerald-600" },
        { name: "Gujarati", image: "https://images.unsplash.com/photo-1588076186114-a3898e30530d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGd1amFyYXRpJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D", color: "from-yellow-600 to-orange-600" },
       
    ];

    const togglePreference = (name) => {
        setSelectedPreferences(prev => {
            const newSet = new Set(prev);
            if (newSet.has(name)) {
                newSet.delete(name);
            } else {
                newSet.add(name);
            }
            return newSet;
        });
    };

    // ✅ SAVE LOGIC (FIXED)
    const handleSave = () => {
    const updatedUser = {
        ...user,
        foodPreferences: Array.from(selectedPreferences), // ✅ FIXED
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    navigate("/profile");
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12">
            <div className="max-w-6xl mx-auto px-4">

                {/* 🔥 Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                        Choose Your Taste 🍽️
                    </h1>
                    <p className="text-gray-400">
                        Pick your favorite cuisines for personalized recommendations
                    </p>
                </motion.div>

                {/* 🎬 Netflix-style Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
                    {preferences.map((pref, index) => {
                        const isSelected = selectedPreferences.has(pref.name);

                        return (
                            <motion.div
                                key={pref.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.04 }}
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => togglePreference(pref.name)}
                                className="cursor-pointer"
                            >
                                <div className={`relative rounded-2xl overflow-hidden h-44 transition-all duration-300
                                    ${isSelected
                                        ? "ring-4 ring-orange-500 shadow-xl"
                                        : "ring-1 ring-white/10 hover:ring-white/30"
                                    }`}>

                                    {/* Image */}
                                    <img
                                        src={pref.image}
                                        alt={pref.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${pref.color} opacity-70`} />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-3">
                                        <h3 className="font-semibold text-lg text-center">
                                            {pref.name}
                                        </h3>
                                    </div>

                                    {/* Selected Tick */}
                                    {isSelected && (
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                            <Check className="text-orange-500" size={18} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Count */}
                <div className="text-center mb-6 text-gray-400">
                    {selectedPreferences.size} selected
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        Skip
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={selectedPreferences.size === 0}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 px-6"
                    >
                        Save Preferences
                    </Button>
                </div>

            </div>
        </div>
    );
}