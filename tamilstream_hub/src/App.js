import React, { useState } from "react";
import "./App.css";

// Mock Data for Demo Purposes
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Vikram",
    language: "Tamil",
    genres: ["Action", "Thriller"],
    isFree: true,
    poster: "https://m.media-amazon.com/images/I/71JbUqFHTfL._AC_SY606_.jpg",
  },
  {
    id: 2,
    title: "Jai Bhim",
    language: "Tamil",
    genres: ["Drama"],
    isFree: false,
    poster: "https://m.media-amazon.com/images/I/81YblNgzktL._AC_SY606_.jpg",
  },
  {
    id: 3,
    title: "RRR",
    language: "Telugu",
    genres: ["Action", "Historical"],
    isFree: false,
    poster: "https://m.media-amazon.com/images/I/912LJw-W5LS._AC_SY606_.jpg",
  },
  {
    id: 4,
    title: "Master",
    language: "Tamil",
    genres: ["Action", "Drama"],
    isFree: true,
    poster: "https://m.media-amazon.com/images/I/81Q+S5JP1iL._AC_SY606_.jpg",
  },
  {
    id: 5,
    title: "Asuran",
    language: "Tamil",
    genres: ["Drama", "Thriller"],
    isFree: false,
    poster: "https://m.media-amazon.com/images/I/819Dz95sKuL._AC_SY606_.jpg",
  },
  {
    id: 6,
    title: "KGF Chapter 2",
    language: "Kannada",
    genres: ["Action"],
    isFree: true,
    poster: "https://m.media-amazon.com/images/I/91aGvQq0RtL._AC_SY606_.jpg",
  },
];

const GENRES = [
  "All",
  "Action",
  "Drama",
  "Thriller",
  "Historical"
];

const LANGUAGES = [
  "Tamil",
  "Telugu",
  "Kannada"
];

// === Helpers ===
function movieMatchesFilters(movie, { genre, language, query }) {
  // genre and language can be "All"; query can be any string
  const genreMatch =
    genre === "All" || movie.genres.includes(genre);
  const languageMatch =
    !language || movie.language === language;
  const queryMatch =
    !query ||
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genres.some((g) =>
      g.toLowerCase().includes(query.toLowerCase())
    );

  return genreMatch && languageMatch && queryMatch;
}

// === Components ===

// PUBLIC_INTERFACE
function Navbar({ user, onLoginClick, onLogoutClick }) {
  /** Renders the main nav bar with logo and login/logout button. */
  return (
    <nav className="navbar" style={{ background: "#1a1a1a" }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div className="logo" style={{ letterSpacing: 1 }}>
            <span className="logo-symbol" style={{ color: "#f10410", fontWeight: 900 }}>{"●}</span>
            <span style={{ color: "#fbf9f9" }}>TamilStream Hub</span>
          </div>
          <div>
            {user ? (
              <>
                <span style={{ color: "#fbf9f9", marginRight: 16 }}>{user.email}</span>
                <button className="btn" style={{ background: "#f10410" }} onClick={onLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn" style={{ background: "#f10410" }} onClick={onLoginClick}>
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function Sidebar({ genres, selectedGenre, setSelectedGenre, languages, selectedLang, setSelectedLang }) {
  /** Sidebar left for genre and language filters */
  return (
    <aside className="sidebar"
      style={{
        width: 180,
        backgroundColor: "#232323",
        borderRight: "1px solid #2d2d2d",
        minHeight: "calc(100vh - 64px)", // Adjust for Navbar
        paddingTop: 40
      }}>
      <div>
        <h4 style={{ color: "#fbf9f9", fontWeight: 600, fontSize: "1.07rem", marginBottom: 10 }}>Genres</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {genres.map((g) => (
            <button
              key={g}
              className="btn"
              style={{
                background: selectedGenre === g ? "#f10410" : "#393939",
                color: "#fff",
                fontWeight: selectedGenre === g ? 700 : 400,
                marginBottom: 2,
                borderRadius: 3,
                padding: "5px 8px",
                fontSize: "1rem",
                border: 0
              }}
              onClick={() => setSelectedGenre(g)}>
              {g}
            </button>
          ))}
        </div>
        <h4 style={{ color: "#fbf9f9", fontWeight: 600, fontSize: "1.07rem", marginTop: 34, marginBottom: 10 }}>Languages</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {languages.map((l) => (
            <button
              key={l}
              className="btn"
              style={{
                background: selectedLang === l ? "#f10410" : "#393939",
                color: "#fff",
                fontWeight: selectedLang === l ? 700 : 400,
                marginBottom: 2,
                borderRadius: 3,
                padding: "5px 8px",
                fontSize: "1rem",
                border: 0
              }}
              onClick={() => setSelectedLang(l)}>
              {l}
            </button>
          ))}
          <button
            className="btn"
            style={{
              background: selectedLang === null ? "#f10410" : "#393939",
              color: "#fff",
              marginBottom: 2,
              borderRadius: 3,
              padding: "5px 8px",
              fontSize: "1rem",
              fontWeight: selectedLang === null ? 700 : 400,
              border: 0
            }}
            onClick={() => setSelectedLang(null)}>
            All
          </button>
        </div>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
function SearchBar({ query, setQuery }) {
  /** Prominent search input */
  return (
    <div style={{
      width: "100%",
      background: "#252525",
      borderRadius: 8,
      marginBottom: 32,
      marginTop: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <input
        style={{
          width: "100%",
          padding: 18,
          border: 0,
          background: "transparent",
          color: "#fbf9f9",
          fontSize: "1.2rem",
          outline: "none",
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies, keywords..."
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function MovieGrid({ movies, onSelectMovie, user }) {
  /** Grid of movie cards */
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
      gap: 25,
      paddingBottom: 20,
    }}>
      {movies.length === 0 && (
        <div
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: "#ff4444",
            marginTop: 50,
            fontWeight: 600
          }}>
          No movies found for current filters.
        </div>
      )}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={() => onSelectMovie(movie)}
          user={user}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function MovieCard({ movie, onSelect, user }) {
  /** Single movie item display as card */
  return (
    <div
      onClick={onSelect}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#222",
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.12)",
        position: "relative",
        transition: "box-shadow .16s",
        border: "1.5px solid #272727",
        minHeight: 280,
        display: "flex",
        flexDirection: "column"
      }}>
      <div style={{ height: 240, background: "#191919", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* poster image (with fallback) */}
        {movie.poster
          ? <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ color: "#888", fontSize: 48 }}>🎬</span>
        }
      </div>
      <div style={{ padding: "12px 10px 23px 12px", flex: "1 1 auto" }}>
        <div style={{ fontWeight: 700, fontSize: "1.07rem", color: "#fff", marginBottom: 4 }}>{movie.title}</div>
        <div style={{ color: "#fae0e1", fontSize: "0.98rem", opacity: 0.87, fontWeight: 500 }}>
          {movie.language} &nbsp;|&nbsp;
          <span style={{ color: "#bdc0c7" }}>{movie.genres.join(", ")}</span>
        </div>
        {movie.isFree ? (
          <span style={{
            padding: "2px 9px",
            position: "absolute",
            top: 8, left: 8,
            background: "#067700d1",
            color: "#f7f7f7",
            borderRadius: 10,
            fontSize: "0.83rem",
            fontWeight: 500,
            letterSpacing: 1.1
          }}>Free</span>
        ) : (
          <span style={{
            position: "absolute",
            top: 7, left: 8,
            background: "#f10410eb",
            color: "white",
            borderRadius: "50%",
            width: 29,
            height: 29,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 19,
            zIndex: 2
          }}>
            <span role="img" aria-label="Lock" style={{ marginTop: 1, marginLeft: 1 }}>🔒</span>
          </span>
        )}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MovieDetailModal({ movie, user, onClose, onSubscribe }) {
  /** Modal window to show details of a selected movie */
  if (!movie) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(30,25,32,0.83)",
      zIndex: 5025,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#1a1a1a",
        borderRadius: 15,
        maxWidth: 480,
        width: "98%",
        boxShadow: "0 2px 40px rgba(0,0,0,0.54)",
        padding: 32,
        position: "relative"
      }}>
        <button
          className="btn"
          style={{
            position: "absolute",
            top: 18, right: 20,
            padding: "5px 14px",
            background: "#232"
          }}
          onClick={onClose}>
          Close
        </button>
        {movie.poster && (
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <img src={movie.poster} alt={movie.title} style={{ maxHeight: 220, width: "auto", borderRadius: 10 }} />
          </div>
        )}
        <h2 style={{ color: "#fbf9f9", margin: 0 }}>{movie.title}</h2>
        <div style={{ color: "#dfdbdb", fontSize: "1.05rem", marginBottom: 7 }}>{movie.language} | {movie.genres.join(", ")}</div>
        {
          movie.isFree ?
            <span style={{
              color: "#00df54",
              fontWeight: 700,
              background: "#0a7218",
              borderRadius: 7,
              padding: "3px 10px",
              fontSize: "1rem"
            }}>Free to Watch</span>
            :
            <span style={{
              color: "#ffffff",
              fontWeight: 700,
              background: "#f10410",
              borderRadius: 8,
              padding: "3px 10px",
              fontSize: "1rem",
              marginRight: 5
            }}>
              Requires Subscription &nbsp;
              <span role="img" aria-label="lock">🔒</span>
            </span>
        }
        <div style={{ marginTop: 25 }}>
          {movie.isFree || (user && user.subscribed)
            ? (<button className="btn btn-large" style={{ background: "#f10410", color: "#fff" }}>Watch Now</button>)
            : (!user
              ? (<div><em style={{ color: "#fff" }}>Login to subscribe & unlock</em></div>)
              : (<button className="btn btn-large"
                style={{ background: "#f10410", color: "#fff" }}
                onClick={onSubscribe}>Subscribe Now</button>))
          }
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AuthModal({ mode, onClose, onAuth, error }) {
  /** Modal for login/sign up – simple demo UX. */
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email || !pw) return;
    onAuth(email, pw, mode);
  }
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(30,25,32,0.7)",
      zIndex: 6000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#26232b",
        borderRadius: 12,
        width: 340,
        boxShadow: "0 2px 30px rgba(0,0,0,0.59)",
        padding: "32px 26px 22px 26px",
        position: "relative"
      }}>
        <button
          className="btn"
          style={{ position: "absolute", top: 13, right: 18, background: "#292929", color: "#fae0e1", fontSize: 15, padding: "6px 11px" }}
          onClick={onClose}>X</button>
        <h2 style={{ color: "#fbf9f9", textAlign: "center", margin: 0, marginBottom: 14 }}>
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <input
            type="email"
            placeholder="Email"
            style={{ padding: 8, fontSize: 16, borderRadius: 4, border: "1px solid #dae", background: "#f5f2fa" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={{ padding: 8, fontSize: 16, borderRadius: 4, border: "1px solid #dae", background: "#f5f2fa" }}
            value={pw}
            onChange={e => setPw(e.target.value)}
            minLength={3}
            required
          />
          <button type="submit" className="btn btn-large" style={{ background: "#f10410", color: "#fff" }}>
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        {mode === "login" ? (
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 15, color: "#cdc9cf" }}>
            New user?{" "}
            <button style={{ background: "none", border: 0, color: "#f10410", cursor: "pointer", textDecoration: "underline", fontSize: 15 }}
              onClick={() => onAuth(null, null, "signup")}>
              Create an account
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 15, color: "#cdc9cf" }}>
            Already registered?{" "}
            <button style={{ background: "none", border: 0, color: "#f10410", cursor: "pointer", textDecoration: "underline", fontSize: 15 }}
              onClick={() => onAuth(null, null, "login")}>
              Login here
            </button>
          </div>
        )}
        {error && <div style={{ color: "#ef2525", marginTop: 13, textAlign: "center", fontWeight: 500 }}>{error}</div>}
      </div>
    </div>
  );
}

// === Main App ===

// PUBLIC_INTERFACE
function App() {
  // Demo State Management
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLang, setSelectedLang] = useState(null); // null means all
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Demo user & auth
  const [user, setUser] = useState(null); // e.g., { email, subscribed }
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  // Filtered movie list
  const filteredMovies = MOCK_MOVIES.filter((movie) =>
    movieMatchesFilters(movie, {
      genre: selectedGenre,
      language: selectedLang,
      query
    })
  );

  // Demo: handle login/signup in-memory
  function handleAuth(email, pw, mode) {
    setAuthError("");
    if (mode === "login") {
      // Accept demo user
      if (email === "test@demo.com" && pw === "1234") {
        setUser({ email, subscribed: false });
        setShowAuth(false);
        return;
      }
      setAuthError("Invalid credentials for demo (try test@demo.com/1234)");
    } else if (mode === "signup") {
      if (!email) {
        setAuthMode("signup"); // Just switch form
        return;
      }
      setUser({ email, subscribed: false });
      setShowAuth(false);
    } else {
      // Switch mode only
      setAuthMode(mode);
      setAuthError("");
    }
  }

  function handleLogout() {
    setUser(null);
  }

  function handleSubscribe() {
    setUser((u) => u ? { ...u, subscribed: true } : u);
    setSelectedMovie(null);
    alert("You are now subscribed! You can watch all movies.");
  }

  // Page Layout: Navbar (fixed), Sidebar, Main Body
  return (
    <div className="app" style={{ background: "#1a1a1a", color: "#fbf9f9" }}>
      <Navbar
        user={user}
        onLoginClick={() => { setAuthMode("login"); setShowAuth(true); }}
        onLogoutClick={handleLogout}
      />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          genres={GENRES}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          languages={LANGUAGES}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />

        <main className="main-section"
          style={{
            flex: 1,
            marginLeft: 0,
            padding: "105px 0 0 0",
            minHeight: "100vh",
            background: "#191919",
            boxSizing: "border-box"
          }}
        >
          <div className="container" style={{ maxWidth: 1200, marginLeft: 30, paddingLeft: 32 }}>
            <h1 className="title" style={{ color: "#f10410", fontSize: "2.2rem", fontWeight: 800, marginTop: 2, marginBottom: 8, letterSpacing: 0.2 }}>
              Browse Movies
            </h1>
            <div className="description" style={{ color: "#dadada", fontWeight: 500, marginBottom: 19 }}>
              Stream Tamil & other language movies. Filter by genre, search, and unlock premium content by subscribing!
            </div>
            <SearchBar query={query} setQuery={setQuery} />
            <MovieGrid
              movies={filteredMovies}
              onSelectMovie={setSelectedMovie}
              user={user}
            />
          </div>
        </main>
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          user={user}
          onClose={() => setSelectedMovie(null)}
          onSubscribe={handleSubscribe}
        />
      )}

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onAuth={handleAuth}
          error={authError}
        />
      )}
    </div>
  );
}

export default App;
