import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CamperPage from "./pages/CamperPage";
import FavoritesPage from "./pages/FavoritesPage"; // ← додали

function App() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">🏠 Головна</Link> {" | "}
        <Link to="/catalog">🚐 Каталог</Link> {" | "}
        <Link to="/favorites">⭐ Обране</Link> {/* ← додали */}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> {/* ← додали */}
      </Routes>
    </div>
  );
}

export default App;