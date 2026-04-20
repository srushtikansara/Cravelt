import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="search-box">
        <input placeholder="Choose location" />
        <input placeholder="Search restaurants or cuisines" />
        <button>Search</button>
      </div>
    </section>
  );
}