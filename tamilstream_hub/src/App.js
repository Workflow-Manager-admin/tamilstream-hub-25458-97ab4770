import React, { useState } from "react";
import "./App.css";
import jaiBhimPoster from "./20250529_175857_jaibhim.jpeg";
import asuranPoster from "./20250529_180329_asuran.jpg";

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
    poster: jaiBhimPoster, // Use local image asset
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
    poster: asuranPoster, // Use local image asset for Asuran poster
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

// PUBLIC_INTERFACE
function Navbar() {
  /** Renders a minimalist nav bar with only branding, no login/logout. */
  return (
    <nav className="navbar" style={{ background: "#1a1a1a" }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div className="logo" style={{ letterSpacing: 1 }}>
            {/* Director's chair icon, DM brand accent */}
            <span className="logo-symbol" style={{ color: "#7098d3", fontWeight: 900, fontSize: "1.45rem" }}>🎬</span>
            <span style={{
              color: "#fde047",
              fontWeight: 600,
              textShadow: "0px 1px 5px #1b253d"
            }}>Directors Mania</span>
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
function MovieGrid({ movies, onSelectMovie }) {
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
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function MovieCard({ movie, onSelect }) {
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
function MovieDetailPanel({ movie, onClose }) {
  /** NON-interactive static panel for selected movie info */
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
        {movie.isFree ? (
          <span style={{
            color: "#00df54",
            fontWeight: 700,
            background: "#0a7218",
            borderRadius: 7,
            padding: "3px 10px",
            fontSize: "1rem"
          }}>Free to Watch</span>
        ) : (
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
        )}
        <div style={{ marginTop: 25 }}>
          {movie.isFree ?
            (<span style={{ color: "#fde047", fontWeight: 650 }}>Enjoy streaming this free movie!</span>)
            : (
              <span style={{ color: "#fde047", fontWeight: 650 }}>
                Subscription movies are demo-locked.<br />
                (No subscription/signup required on this demo.)
              </span>
            )}
        </div>
      </div>
    </div>
  );
}

// === Main App ===

// PUBLIC_INTERFACE
function App() {
  // Only browse/search/filter/select, NO prompts, NO user/auth state
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLang, setSelectedLang] = useState(null); // null means all
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Filtered movie list
  const filteredMovies = MOCK_MOVIES.filter((movie) =>
    movieMatchesFilters(movie, {
      genre: selectedGenre,
      language: selectedLang,
      query
    })
  );

  // Layout: Navbar (fixed), Sidebar, Main Body
  return (
    <div className="app" style={{ background: "#1a1a1a", color: "#fbf9f9" }}>
      <Navbar />
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
            <h1 className="title" style={{
              color: "#7098d3",
              fontSize: "2.28rem",
              fontWeight: 800,
              marginTop: 2,
              marginBottom: 7,
              letterSpacing: 0.5,
              textShadow: "0 1.5px 6px #101827aa"
            }}>
              Celebrate Great Directors & Their Movies
            </h1>
            <div className="description" style={{
              color: "#e2debe",
              fontWeight: 510,
              marginBottom: 20,
              background: "rgba(46,89,167,0.05)",
              borderRadius: 6,
              padding: "6px 13px 6px 7px",
              display: "inline-block"
            }}>
              Browse, search, and filter a curated collection spotlighting the work of top directors. Discover their style across genres and languages.
            </div>
            <SearchBar query={query} setQuery={setQuery} />
            <MovieGrid
              movies={filteredMovies}
              onSelectMovie={setSelectedMovie}
            />
          </div>
        </main>
      </div>
      {/* Show static info panel with close for movie details (NO subscription/NO login/NO prompts) */}
      {selectedMovie && (
        <MovieDetailPanel
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
