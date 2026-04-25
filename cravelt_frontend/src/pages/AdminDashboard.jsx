import { useEffect, useState } from "react";

const API = "https://cravelt.onrender.com/api";

const CUISINES = ["North Indian", "South Indian", "Chinese", "Italian", "Mexican", "Continental", "Fast Food", "Cafe", "Desserts", "Seafood", "Street Food", "Mughlai"];
const AMBIENCES = ["Romantic", "Family", "Casual", "Fine Dining", "Rooftop", "Outdoor", "Cozy", "Trendy", "Sports Bar"];
const CITIES = ["Ahmedabad", "Vadodara", "Surat", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"];

const initialForm = {
  name: "", location: "", city: "", cuisine: [], ambience: [],
  rating: "", priceForTwo: "", image: "", veg: false,
  dietary: [], description: "", openTime: "", closeTime: "",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("restaurants");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [resLoading, setResLoading] = useState(false);
  const [resFilter, setResFilter] = useState("ALL");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/restaurants`);
      const data = await res.json();
      setRestaurants(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to fetch restaurants", "error");
    }
    setLoading(false);
  };

  useEffect(() => { fetchRestaurants(); }, []);

  const fetchReservations = async () => {
    setResLoading(true);
    try {
      const res = await fetch(`${API}/reservations`);
      const data = await res.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to fetch reservations", "error");
    }
    setResLoading(false);
  };

  useEffect(() => { if (tab === "reservations") fetchReservations(); }, [tab]);

  const handleConfirmReservation = async (id) => {
    try {
      await fetch(`${API}/reservations/${id}/confirm`, { method: "PUT" });
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: "CONFIRMED" } : r));
      showToast("Reservation confirmed!");
    } catch { showToast("Failed to confirm", "error"); }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;
    try {
      await fetch(`${API}/reservations/${id}`, { method: "DELETE" });
      setReservations(prev => prev.filter(r => r._id !== id));
      showToast("Reservation deleted");
    } catch { showToast("Delete failed", "error"); }
  };

  const handleMultiSelect = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.location) {
      showToast("Name and location are required", "error");
      return;
    }
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/restaurants/${editId}` : `${API}/restaurants`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: parseFloat(form.rating) || 0, priceForTwo: parseInt(form.priceForTwo) || 0 }),
      });
      if (res.ok) {
        showToast(editId ? "Restaurant updated!" : "Restaurant added!");
        setForm(initialForm);
        setEditId(null);
        setShowForm(false);
        fetchRestaurants();
      } else {
        showToast("Failed to save", "error");
      }
    } catch {
      showToast("Server error", "error");
    }
  };

  const handleEdit = (r) => {
    setForm({
      name: r.name || "", location: r.location || "", city: r.city || "",
      cuisine: r.cuisine || [], ambience: r.ambience || [],
      rating: r.rating || "", priceForTwo: r.priceForTwo || "",
      image: r.image || "", veg: r.veg || false,
      dietary: r.dietary || [], description: r.description || "",
      openTime: r.openTime || "", closeTime: r.closeTime || "",
    });
    setEditId(r.id || r._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;
    try {
      await fetch(`${API}/restaurants/${id}`, { method: "DELETE" });
      showToast("Deleted successfully");
      fetchRestaurants();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const filtered = restaurants.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* TOAST */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "error" ? "#ef4444" : "#22c55e" }}>
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarLogo}>🍽️<span>Cravelt</span></div>
        <div style={styles.sidebarLabel}>ADMIN PANEL</div>
        {[
          { key: "restaurants", label: "🏪 Restaurants" },
          { key: "reservations", label: "📋 Reservations" },
          { key: "stats", label: "📊 Stats" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ ...styles.sidebarBtn, ...(tab === t.key ? styles.sidebarBtnActive : {}) }}>
            {t.label}
            {t.key === "reservations" && reservations.filter(r => r.status === "PENDING").length > 0 && (
              <span style={styles.badge}>{reservations.filter(r => r.status === "PENDING").length}</span>
            )}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>
              {tab === "restaurants" ? "Restaurant Manager" : tab === "reservations" ? "Reservations" : "Stats"}
            </h1>
            <p style={styles.subheading}>
              {tab === "restaurants" ? `${restaurants.length} restaurants total`
                : tab === "reservations" ? `${reservations.length} total · ${reservations.filter(r => r.status === "PENDING").length} pending`
                : "Overview"}
            </p>
          </div>
          {tab === "restaurants" && (
            <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setEditId(null); setForm(initialForm); }}>
              {showForm ? "✕ Cancel" : "+ Add Restaurant"}
            </button>
          )}
        </div>

        {/* FORM */}
        {showForm && (
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>{editId ? "✏️ Edit Restaurant" : "➕ Add New Restaurant"}</h2>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Restaurant Name *</label>
                <input style={styles.input} placeholder="e.g. Spice Garden" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Location / Address *</label>
                <input style={styles.input} placeholder="e.g. CG Road, Ahmedabad" value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>City</label>
                <select style={styles.input} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                  <option value="">Select City</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Rating (0-5)</label>
                <input style={styles.input} type="number" min="0" max="5" step="0.1" placeholder="4.2"
                  value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Price For Two (₹)</label>
                <input style={styles.input} type="number" placeholder="500" value={form.priceForTwo}
                  onChange={e => setForm({ ...form, priceForTwo: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Image URL</label>
                <input style={styles.input} placeholder="https://..." value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Opening Time</label>
                <input style={styles.input} type="time" value={form.openTime}
                  onChange={e => setForm({ ...form, openTime: e.target.value })} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Closing Time</label>
                <input style={styles.input} type="time" value={form.closeTime}
                  onChange={e => setForm({ ...form, closeTime: e.target.value })} />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, height: 80, resize: "vertical" }}
                placeholder="Brief description of the restaurant..."
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>

            {/* CUISINE */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Cuisine Types</label>
              <div style={styles.tagGrid}>
                {CUISINES.map(c => (
                  <button key={c} type="button"
                    onClick={() => handleMultiSelect("cuisine", c)}
                    style={{ ...styles.tag, ...(form.cuisine.includes(c) ? styles.tagActive : {}) }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* AMBIENCE */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Ambience</label>
              <div style={styles.tagGrid}>
                {AMBIENCES.map(a => (
                  <button key={a} type="button"
                    onClick={() => handleMultiSelect("ambience", a)}
                    style={{ ...styles.tag, ...(form.ambience.includes(a) ? styles.tagActive : {}) }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* DIETARY */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Dietary Options</label>
              <div style={styles.tagGrid}>
                {["Vegan", "Gluten Free", "Jain", "Halal", "Keto"].map(d => (
                  <button key={d} type="button"
                    onClick={() => handleMultiSelect("dietary", d)}
                    style={{ ...styles.tag, ...(form.dietary.includes(d) ? styles.tagGreen : {}) }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* VEG TOGGLE */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <label style={styles.label}>Pure Veg Restaurant</label>
              <div onClick={() => setForm({ ...form, veg: !form.veg })}
                style={{ ...styles.toggle, background: form.veg ? "#22c55e" : "#374151" }}>
                <div style={{ ...styles.toggleDot, transform: form.veg ? "translateX(24px)" : "translateX(2px)" }} />
              </div>
              <span style={{ color: form.veg ? "#22c55e" : "#9ca3af", fontSize: 14 }}>
                {form.veg ? "Yes 🌿" : "No"}
              </span>
            </div>

            <button style={styles.submitBtn} onClick={handleSubmit}>
              {editId ? "💾 Update Restaurant" : "✅ Add Restaurant"}
            </button>
          </div>
        )}

        {/* STATS TAB */}
        {tab === "stats" && (
          <div style={styles.statsGrid}>
            {[
              { label: "Total Restaurants", value: restaurants.length, icon: "🏪" },
              { label: "Veg Only", value: restaurants.filter(r => r.veg).length, icon: "🌿" },
              { label: "Avg Rating", value: (restaurants.reduce((a, r) => a + (r.rating || 0), 0) / (restaurants.length || 1)).toFixed(1), icon: "⭐" },
              { label: "Cities Covered", value: new Set(restaurants.map(r => r.city).filter(Boolean)).size, icon: "📍" },
            ].map(s => (
              <div key={s.label} style={styles.statCard}>
                <div style={styles.statIcon}>{s.icon}</div>
                <div style={styles.statValue}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* RESTAURANTS TAB */}
        {tab === "restaurants" && (
          <>
            <input style={styles.search} placeholder="🔍 Search by name or location..."
              value={search} onChange={e => setSearch(e.target.value)} />

            {loading ? (
              <div style={styles.loading}>Loading restaurants...</div>
            ) : filtered.length === 0 ? (
              <div style={styles.empty}>No restaurants found. Add your first one! 🍽️</div>
            ) : (
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Image", "Name", "Location", "Cuisine", "Rating", "Price For Two", "Veg", "Actions"].map(h => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => (
                      <tr key={r.id || r._id} style={styles.tr}>
                        <td style={styles.td}>
                          {r.image
                            ? <img src={r.image} alt={r.name} style={styles.thumb} onError={e => e.target.style.display = "none"} />
                            : <div style={styles.noImg}>🍽️</div>}
                        </td>
                        <td style={{ ...styles.td, fontWeight: 600, color: "#f9fafb" }}>{r.name}</td>
                       <td style={styles.td}>{r.location || r.address || "—"}</td>
                      // Cuisine — this SHOULD work, check if it's rendering
                      <td style={styles.td}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {(r.cuisine || []).slice(0, 2).map(c => (
                            <span key={c} style={styles.chip}>{c}</span>
                          ))}
                        </div>
                      </td>
                       <td style={styles.td}>
                          <span style={styles.rating}>⭐ {r.rating}</span>
                        </td>
                        <td style={styles.td}>₹{r.priceForTwo || "—"}</td>
                       <td style={styles.td}>
  <span style={{ color: (r.veg || r.dietary?.includes("veg")) ? "#22c55e" : "#9ca3af" }}>
    {(r.veg || r.dietary?.includes("veg")) ? "🌿 Yes" : "No"}
  </span>
</td>
                        <td style={styles.td}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button style={styles.editBtn} onClick={() => handleEdit(r)}>✏️ Edit</button>
                            <button style={styles.deleteBtn} onClick={() => handleDelete(r.id || r._id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        {/* RESERVATIONS TAB */}
        {tab === "reservations" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {["ALL", "PENDING", "CONFIRMED"].map(f => (
                <button key={f} onClick={() => setResFilter(f)}
                  style={{ ...styles.filterBtn, ...(resFilter === f ? styles.filterBtnActive : {}) }}>
                  {f}
                </button>
              ))}
            </div>
            {resLoading ? (
              <div style={styles.loading}>Loading reservations...</div>
            ) : reservations.length === 0 ? (
              <div style={styles.empty}>No reservations yet 📋</div>
            ) : (
              <div style={styles.resGrid}>
                {reservations
                  .filter(r => resFilter === "ALL" || r.status === resFilter)
                  .map(r => (
                    <div key={r._id} style={styles.resCard}>
                      <div style={styles.resCardHeader}>
                        <div>
                          <div style={styles.resName}>{r.name}</div>
                          <div style={styles.resRestaurant}>🍽️ {r.restaurantName}</div>
                        </div>
                        <span style={{ ...styles.resBadge, background: r.status === "CONFIRMED" ? "#14532d" : "#78350f", color: r.status === "CONFIRMED" ? "#4ade80" : "#fbbf24" }}>
                          {r.status || "PENDING"}
                        </span>
                      </div>
                      <div style={styles.resDetails}>
  <span>📧 {r.email}</span>
  <span>👥 {r.guests} guests</span>
  <span>📅 {r.date}</span>
  <span>⏰ {r.time}</span>
  <span>🍽️ {r.restaurantName}</span>
  <span>📝 Special Requests</span>
</div>
                      {r.request && <div style={styles.resRequest}>📝 {r.request}</div>}
                      <div style={styles.resActions}>
                        {r.status !== "CONFIRMED" && (
                          <button style={styles.confirmBtn} onClick={() => handleConfirmReservation(r._id)}>
                            ✅ Confirm
                          </button>
                        )}
                        <button style={styles.deleteBtn} onClick={() => handleDeleteReservation(r._id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" },
  sidebar: { width: 220, background: "#1e293b", padding: "24px 16px", display: "flex", flexDirection: "column", gap: 8, borderRight: "1px solid #334155", flexShrink: 0 },
  sidebarLogo: { fontSize: 22, fontWeight: 700, color: "#f97316", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 },
  sidebarLabel: { fontSize: 10, letterSpacing: 2, color: "#64748b", marginBottom: 8, marginTop: 16 },
  sidebarBtn: { background: "transparent", border: "none", color: "#94a3b8", padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontSize: 14, transition: "all 0.2s" },
  sidebarBtnActive: { background: "#f97316", color: "#fff", fontWeight: 600 },
  main: { flex: 1, padding: "32px", overflowY: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  heading: { fontSize: 28, fontWeight: 700, color: "#f9fafb", margin: 0 },
  subheading: { color: "#64748b", marginTop: 4, fontSize: 14 },
  addBtn: { background: "#f97316", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 15 },
  formCard: { background: "#1e293b", borderRadius: 16, padding: 28, marginBottom: 28, border: "1px solid #334155" },
  formTitle: { fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#f9fafb" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 16 },
  formGroup: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: 0.5 },
  input: { background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px", color: "#f9fafb", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
  tagGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: { padding: "6px 14px", borderRadius: 20, border: "1px solid #334155", background: "#0f172a", color: "#94a3b8", cursor: "pointer", fontSize: 13 },
  tagActive: { background: "#f97316", color: "#fff", border: "1px solid #f97316" },
  tagGreen: { background: "#15803d", color: "#fff", border: "1px solid #15803d" },
  toggle: { width: 50, height: 26, borderRadius: 13, cursor: "pointer", position: "relative", transition: "background 0.3s" },
  toggleDot: { width: 22, height: 22, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, transition: "transform 0.3s" },
  submitBtn: { background: "#f97316", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 16, marginTop: 8 },
  search: { background: "#1e293b", border: "1px solid #334155", borderRadius: 10, padding: "12px 18px", color: "#f9fafb", fontSize: 15, width: "100%", marginBottom: 20, boxSizing: "border-box", outline: "none" },
  tableWrap: { overflowX: "auto", borderRadius: 12, border: "1px solid #334155" },
  table: { width: "100%", borderCollapse: "collapse", background: "#1e293b" },
  th: { padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: 1, borderBottom: "1px solid #334155", background: "#0f172a" },
  tr: { borderBottom: "1px solid #1e293b", transition: "background 0.15s" },
  td: { padding: "14px 16px", fontSize: 14, color: "#94a3b8", verticalAlign: "middle" },
  thumb: { width: 52, height: 40, objectFit: "cover", borderRadius: 8 },
  noImg: { width: 52, height: 40, background: "#334155", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  chip: { background: "#334155", color: "#94a3b8", padding: "2px 10px", borderRadius: 12, fontSize: 12 },
  rating: { background: "#1c2f1a", color: "#4ade80", padding: "3px 10px", borderRadius: 12, fontSize: 13, fontWeight: 600 },
  editBtn: { background: "#1d4ed8", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 13 },
  deleteBtn: { background: "#7f1d1d", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 7, cursor: "pointer", fontSize: 13 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 28 },
  statCard: { background: "#1e293b", borderRadius: 16, padding: 24, textAlign: "center", border: "1px solid #334155" },
  statIcon: { fontSize: 32, marginBottom: 8 },
  statValue: { fontSize: 36, fontWeight: 800, color: "#f97316" },
  statLabel: { fontSize: 13, color: "#64748b", marginTop: 4 },
  loading: { textAlign: "center", color: "#64748b", padding: 60, fontSize: 16 },
  empty: { textAlign: "center", color: "#64748b", padding: 60, fontSize: 16 },
  toast: { position: "fixed", top: 24, right: 24, color: "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 600, zIndex: 9999, fontSize: 15 },
  badge: { background: "#ef4444", color: "#fff", borderRadius: 10, fontSize: 11, fontWeight: 700, padding: "1px 7px", marginLeft: 8 },
  filterBtn: { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  filterBtnActive: { background: "#f97316", color: "#fff", border: "1px solid #f97316" },
  resGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 },
  resCard: { background: "#1e293b", borderRadius: 14, padding: 20, border: "1px solid #334155" },
  resCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  resName: { fontSize: 16, fontWeight: 700, color: "#f9fafb" },
  resRestaurant: { fontSize: 13, color: "#f97316", marginTop: 2 },
  resBadge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 },
  resDetails: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 13, color: "#64748b", marginBottom: 12 },
  resRequest: { background: "#0f172a", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#94a3b8", marginBottom: 12 },
  resActions: { display: "flex", gap: 10 },
  confirmBtn: { background: "#14532d", color: "#4ade80", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
};