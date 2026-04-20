import React from "react";

export const priceRanges = [
  { label: "Under ₹500", min: 0, max: 499 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹1500", min: 1000, max: 1500 },
  { label: "₹1500+", min: 1500, max: Infinity },
];

function Filters({ filters, setFilters, onApply, onClear }) {
  const toggle = (category, value) => {
    setFilters(prev => {
      const arr = Array.isArray(prev[category]) ? [...prev[category]] : [];
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
      else arr.push(value);
      return { ...prev, [category]: arr };
    });
  };

  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white w-full md:w-60">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      {/* Ratings */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Rating</h4>
        {[3, 4, 4.5].map(r => (
          <label key={r} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.ratings.includes(r)}
              onChange={() => toggle("ratings", r)}
            />
            {r} & above
          </label>
        ))}
      </div>

      {/* Cuisine */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Cuisine</h4>
        {["Indian", "Continental", "Italian", "Chinese", "Street Food", "Gujarati", "South Indian"].map(c => (
          <label key={c} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.cuisines.includes(c)}
              onChange={() => toggle("cuisines", c)}
            />
            {c}
          </label>
        ))}
      </div>

      {/* Ambience */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Ambience</h4>
        {["Luxury", "Family", "Casual", "Romantic", "Outdoor"].map(a => (
          <label key={a} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.ambience.includes(a)}
              onChange={() => toggle("ambience", a)}
            />
            {a}
          </label>
        ))}
      </div>

      {/* Dietary */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Dietary</h4>
        {["Veg", "Non-Veg", "Vegan", "Eggless", "Egg"].map(d => (
          <label key={d} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.dietary.includes(d)}
              onChange={() => toggle("dietary", d)}
            />
            {d}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Price for Two</h4>
        {priceRanges.map(pr => (
          <label key={pr.label} className="block cursor-pointer mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.priceRange.includes(pr.label)}
              onChange={() => toggle("priceRange", pr.label)}
            />
            {pr.label}
          </label>
        ))}
      </div>

      {/* Add Apply / Clear buttons inside the filter card */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onApply}
          className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
        >
          Apply
        </button>
        <button
          onClick={onClear}
          className="flex-1 py-2 px-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white rounded font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Filters;