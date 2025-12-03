// Represents a single book in the grid. Clicking auto-opens the best format.

import React from "react";

export default function BookCard({ book }) {
  const formats = book.formats || {};

  /**
   * Determines the best book format to open.
   * Priority: HTML → PDF → TXT
   */
  const openBestFormat = () => {
    const keys = Object.keys(formats);

    const html = keys.find((k) =>
      k.includes("text/html") || (formats[k] && /\.(html|htm)$/i.test(formats[k]))
    );

    const pdf = keys.find((k) =>
      k.includes("pdf") || (formats[k] && /\.pdf$/i.test(formats[k]))
    );

    const txt = keys.find((k) =>
      k.includes("text/plain") || (formats[k] && /\.txt$/i.test(formats[k]))
    );

    const url = html ? formats[html] : pdf ? formats[pdf] : txt ? formats[txt] : null;

    if (!url) return alert("No readable format available for this book.");

    window.open(url, "_blank");
  };

  // Extract cover image
  const cover =
    formats["image/jpeg"] ||
    Object.values(formats).find((v) => v.endsWith(".jpg")) ||
    "";

  return (
    <div className="book-card" onClick={openBestFormat}>
      <img src={cover} alt={book.title} className="book-img" />

      <div className="book-title">{book.title}</div>

      <div className="book-author">
        {book.authors?.[0]?.name || "Unknown Author"}
      </div>
    </div>
  );
}
