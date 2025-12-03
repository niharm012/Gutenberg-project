// A clickable card used on the homepage to select a genre

import React from "react";

export default function GenreCard({ name, icon, onClick }) {
  return (
    <div className="genre-card" onClick={onClick}>
      <span className="genre-icon">{icon}</span>
      <span className="genre-text">{name}</span>
      <span className="genre-arrow">→</span>
    </div>
  );
}
