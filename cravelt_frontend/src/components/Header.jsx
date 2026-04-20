import "./Header.css";

export default function Header() {
  const isLoggedIn = true; // toggle later with auth

  return (
    <header className="header">
      <div className="logo">
        <h1>Cravelt</h1>
        <p>Discover the best food near you</p>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <div className="profile-icon">👤</div>
        ) : (
          <>
            <button>Sign In</button>
            <button className="primary">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}
