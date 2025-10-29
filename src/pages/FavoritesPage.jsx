import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCamperById } from "../api/campersApi";
import CamperCard from "../components/CamperCard";

export default function FavoritesPage() {
  const favIds = useSelector(s => s.favorites.ids);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const res = [];
      for (const id of favIds) {
        try { res.push(await getCamperById(id)); } catch {}
      }
      if (!ignore) setItems(res);
    })();
    return () => { ignore = true; };
  }, [favIds]);

  return (
    <div style={{display:"grid", gap:12}}>
      <h1>Обрані</h1>
      {items.length === 0 ? <p>Пусто</p> : items.map(c => <CamperCard key={c.id} camper={c} />)}
    </div>
  );
}