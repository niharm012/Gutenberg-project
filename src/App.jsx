// Handles routing for the entire application
import { Routes, Route } from "react-router-dom";
import Genres from "./pages/Home";
import Books from "./pages/Books";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Genres />} />
      <Route path="/books/:genre" element={<Books />} />
    </Routes>
  );
}
