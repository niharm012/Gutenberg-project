// Displays the list of genres on the homepage
import React from "react";
import { useNavigate } from "react-router-dom";
import GenreCard from "../components/GenreCard";
import "../pages/home.css";

// List of genres with icons
const GENRES = [
  { name: "Fiction", icon: "🧪" },
  { name: "Drama", icon: "🎭" },
  { name: "Humour", icon: "😄" },
  { name: "Politics", icon: "🧍" },
  { name: "Philosophy", icon: "☯️" },
  { name: "History", icon: "📏" },
  { name: "Adventure", icon: "🧗" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page page-center">
      <header className="home-header">
        <h1 className="home-title">Gutenberg Project</h1>

        <p className="home-sub">
          A social cataloging website that lets you explore books, authors and reviews freely.
        </p>
      </header>

      {/* Genre selection grid */}
      <div className="genres-grid">
        {GENRES.map((g) => (
          <GenreCard
            key={g.name}
            name={g.name}
            icon={g.icon}
            onClick={() => navigate(`/books/${encodeURIComponent(g.name)}`)}
          />
        ))}
      </div>
    </div>
  );
}
