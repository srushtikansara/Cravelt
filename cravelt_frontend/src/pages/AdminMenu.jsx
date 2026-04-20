import { useEffect, useState } from "react";
import "./AdminMenu.css";

export default function AdminMenu() {
  const [restaurantId, setRestaurantId] = useState("1");
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    veg: true,
  });

  const fetchMenu = () => {
    fetch(`http://localhost:9999/api/menu/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  };

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  const addItem = () => {
    fetch("http://localhost:9999/api/menu/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        ...form,
        price: parseFloat(form.price),
      }),
    }).then(() => {
      setForm({ name: "", category: "", price: "", veg: true });
      fetchMenu();
    });
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:9999/api/menu/item/${id}`, {
      method: "DELETE",
    }).then(() => fetchMenu());
  };

  return (
    <div className="admin-wrapper">

      {/* HEADER */}
      <div className="header">
        <h1>🍽️ Admin Menu Panel</h1>

        <div className="restaurant-box">
          <label>Restaurant ID</label>
          <input
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
          />
        </div>
      </div>

      {/* ADD FORM */}
      <div className="form-bar">

        <input
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          value={form.veg}
          onChange={(e) =>
            setForm({ ...form, veg: e.target.value === "true" })
          }
        >
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>

        <button onClick={addItem}>+ Add Item</button>
      </div>

      {/* TABLE */}
      <div className="table-container">

        <table className="menu-table">

          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No items found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <span className={item.veg ? "veg" : "nonveg"}>
                      {item.veg ? "Veg" : "Non-Veg"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}