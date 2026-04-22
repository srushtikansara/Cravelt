// src/components/BookTableForm.jsx
import { useState } from "react";
import { X } from "lucide-react";
import "./BookTableForm.css"; // Make sure CSS path is correct

export default function BookTableForm({ restaurantName, onClose, restaurantId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 1,
    date: "",
    time: "",
    request: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Sending:", { ...form, restaurantId });

  try {
    const res = await fetch("https://cravelt.onrender.com/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        restaurantId: restaurantId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Reservation successful!");
     setTimeout(() => {
  onClose();
}, 1500);
    } else {
      alert("Reservation failed");
    }
    setMessage(
        `Booking confirmed for ${data.name} on ${data.date}. Check your email! ✅`
      );
      setForm({
  name: "",
  email: "",
  guests: 1,
  date: "",
  time: "",
  request: "",
});
  } catch (err) {
    console.error(err);
    alert("Reservation failed. Please try again.");
  }
};

  return (
    <div className="booktable-overlay">
      <div className="booktable-modal">
        <div className="booktable-header">
          <h2>Book Table at {restaurantName}</h2>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>
        <form className="booktable-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            value={form.guests}
            onChange={handleChange}
            min="1"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="request"
            placeholder="Special requests?"
            value={form.request}
            onChange={handleChange}
          />
           <button type="submit">Book Table</button>
      
        </form>
         {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
}