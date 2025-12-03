// Loads books for the selected genre with infinite scroll and search
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import "../pages/books.css";

const API_BASE = "https://gutendex.com/books";

export default function Books() {
  const { genre } = useParams();

  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const loaderRef = useRef(null);

  // Builds API URL including search + genre filter
  const buildUrl = (pageUrl) => {
    if (pageUrl) return pageUrl;

    const params = new URLSearchParams();
    params.set("mime_type", "image/");

    if (genre) params.set("topic", genre);
    if (query) params.set("search", query);

    return `${API_BASE}/?${params.toString()}`;
  };

  // Fetch books from API
  const fetchBooks = async (pageUrl = null, replace = false) => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(pageUrl));
      const data = await res.json();
      setBooks((prev) => (replace ? data.results : [...prev, ...data.results]));
      setNextUrl(data.next);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when genre OR search query changes
  useEffect(() => {
    setBooks([]);
    setNextUrl(null);
    fetchBooks(null, true);
  }, [genre, query]);

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && nextUrl && !loading) {
        fetchBooks(nextUrl);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextUrl, loading]);

  return (
    <div className="page">
      <div className="books-header">
        <Link to="/" className="link-back">Home</Link>
        <h2 className="books-title">{genre}</h2>

        {/* Search bar */}
        <div className="search-wrapper">
          <i className="search-icon" />
          <input
            className="search-input"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Books grid */}
      <div className="books-grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      {/* Infinite scroll loader */}
      <div ref={loaderRef} className="loader-area">
        {loading ? "Loading..." : nextUrl ? "Scroll to load more" : "No more results"}
      </div>
    </div>
  );
}
