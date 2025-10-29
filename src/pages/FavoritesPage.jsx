import { useSelector } from "react-redux";
import CamperCard from "../components/CamperCard";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const favIds = useSelector((st) => st.favorites.ids);
  const items  = useSelector((st) => st.campers.items);
  const favItems = items.filter((c) => favIds.includes(String(c.id)));

  return (
    <div style={{display:"grid", gap:12}}>
      <h1>Обране</h1>

      {favItems.length === 0 ? (
        <div>
          <p>У вас поки немає обраних кемперів.</p>
          <Link to="/catalog">Перейти до каталогу →</Link>
        </div>
      ) : (
        <div style={{display:"grid", gap:12}}>
          {favItems.map((c) => <CamperCard key={c.id} camper={c} />)}
        </div>
      )}
    </div>
  );
}