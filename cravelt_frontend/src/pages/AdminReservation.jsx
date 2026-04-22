import React, { useEffect, useState } from "react";

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch("https://cravelt.onrender.com/api/reservations")
            .then(res => res.json())
            .then(data =>  {
                console.log("DATA:", data);
                setReservations(data);
            })
            .catch(err => console.error(err));
    }, []);

    // ✅ DELETE
    const handleDelete = (id) => {
        fetch(`https://cravelt.onrender.com/api/reservations/${id}`, {
            method: "DELETE",
        }).then(() => {
            setReservations(reservations.filter((r) => r._id !== id));
        });
    };

    // ✅ CONFIRM
    const handleConfirm = (id) => {
        fetch(`https://cravelt.onrender.com/api/reservations/${id}/confirm`, {
            method: "PUT",
        })
        .then((res) => res.json())
        .then(() => {
            setReservations((prev) =>
                prev.map((r) =>
                    r._id === id ? { ...r, status: "CONFIRMED" } : r
                )
            );
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📋 All Reservations</h2>

            {reservations.length === 0 ? (
                <p>No reservations found</p>
            ) : (
                reservations.map((r) => (
                    <div key={r._id} style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                        borderRadius: "10px"
                    }}>
                        <h3>{r.name}</h3>
                        <p>📧 {r.email}</p>
                        <p>👥 Guests: {r.guests}</p>
                        <p>📅 {r.date} ⏰ {r.time}</p>
                        <p>🍽 Restaurant Name: {r.restaurantName}</p>
                        <p>📝 {r.request}</p>
                        <p>Status: {r.status}</p>

                        {/* ✅ FIXED BUTTONS */}
                        <button onClick={() => handleConfirm(r._id)}>
                            Confirm
                        </button>

                        <button onClick={() => handleDelete(r._id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminReservations;