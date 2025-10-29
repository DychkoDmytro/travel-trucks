import { useDispatch, useSelector } from "react-redux";
import { getCampers } from "../api/campersApi";
import CamperCard from "../components/CamperCard";
import FiltersPanel from "../components/FiltersPanel";
import { useEffect, useState } from "react";

export default function CatalogPage() {
  const filters = useSelector(s => s.filters);
  const [items, setItems] = useState([]);
  const [page, setPage]   = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  // собираем params из фильтров
  function buildParams() {
    const p = {};
    if (filters.location) p.location = filters.location.trim();
    if (filters.form && filters.form !== "all") p.form = filters.form;
    if (filters.features.kitchen) p.kitchen = true;
    if (filters.features.shower)  p.shower  = true;
    if (filters.features.airConditioner) p.airConditioner = true;
    return p;
  }

  // загрузка страницы каталога
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const { items: chunk, total } = await getCampers({ page, limit, params: buildParams() });
        if (!ignore) {
          setItems(prev => page === 1 ? chunk : [...prev, ...chunk]);
          setTotal(total);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [page, filters]); // при смене фильтров — page останется 1 (см. ниже)

  // apply из FiltersPanel должен делать: setPage(1) и очистку
  function applyFilters() {
    setItems([]);
    setPage(1);
  }

  const canLoadMore = items.length < total;

  return (
    <div style={{display:"grid", gap:16}}>
      <h1>Каталог кемперів</h1>

      <FiltersPanel onApply={applyFilters} />

      <div style={{display:"grid", gap:12}}>
        {items.map(c => <CamperCard key={c.id} camper={c} />)}
      </div>

      <button
        onClick={() => setPage(p => p + 1)}
        disabled={loading || !canLoadMore}
        style={{padding:"10px 14px", borderRadius:8}}
      >
        {loading ? "Loading..." : (canLoadMore ? "Load More" : "No more")}
      </button>
    </div>
  );
}