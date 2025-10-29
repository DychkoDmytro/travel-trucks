import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FiltersPanel from "../components/FiltersPanel";
import CamperCard from "../components/CamperCard";
import { getCampers } from "../api/campersApi";

export default function CatalogPage() {
  const filters = useSelector((st) => st.filters);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  // перетворюємо фільтри в params для API
  const buildParams = () => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.form) params.form = filters.form;

    if (filters.features) {
      Object.entries(filters.features).forEach(([k, v]) => {
        if (v) params[k] = true; // kitchen=true, shower=true, airConditioner=true
      });
    }
    return params;
  };

  const fetchPage = async (p, { reset = false } = {}) => {
    setLoading(true);
    try {
      const params = buildParams();
      const { items: chunk, total } = await getCampers({ page: p, limit, params });
      setItems((prev) => (reset ? chunk : [...prev, ...chunk]));
      setTotal(total);
    } finally {
      setLoading(false);
    }
  };

  // перше завантаження
  useEffect(() => {
    fetchPage(1, { reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // підвантаження наступних сторінок
  useEffect(() => {
    if (page > 1) fetchPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const canLoadMore = items.length < total;

  // застосувати фільтри: скинути список і сторінку, витягнути заново
  const applyFilters = async () => {
    setPage(1);
    await fetchPage(1, { reset: true });
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1>Каталог кемперів</h1>

      <FiltersPanel onApply={applyFilters} />

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((c) => (
          <CamperCard key={c.id} camper={c} />
        ))}
      </div>

      <div>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading || !canLoadMore}
          style={{ padding: "10px 14px", borderRadius: "8px" }}
        >
          {loading ? "Loading..." : canLoadMore ? "Load More" : "No more"}
        </button>
      </div>
    </div>
  );
}