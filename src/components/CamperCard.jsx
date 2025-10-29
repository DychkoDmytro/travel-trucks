import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favIds = useSelector(s => s.favorites.ids);
  const isFav = favIds.includes(String(camper.id));

  return (
    <div style={{display:"grid", gridTemplateColumns:"220px 1fr auto", gap:16, border:"1px solid #eee", borderRadius:12, padding:12}}>
      <img src={camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original} alt={camper.name} width={220} height={140} style={{objectFit:"cover", borderRadius:10}} />
      <div>
        <h3 style={{margin:"0 0 6px"}}>{camper.name}</h3>
        <p style={{margin:0, color:"#777"}}>📍 {camper.location}</p>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontWeight:700, marginBottom:8}}>€{Number(camper.price).toFixed(2).replace(".", ",")}</div>
        <div style={{display:"flex", gap:8}}>
          <a
            href={`/catalog/${camper.id}`}
            target="_blank"
            rel="noreferrer"
            style={{padding:"8px 12px", border:"1px solid #ddd", borderRadius:8, textDecoration:"none"}}
          >
            Show more
          </a>
          <button
            onClick={() => dispatch(toggleFavorite(camper.id))}
            style={{padding:"8px 12px", borderRadius:8, border:"1px solid #ddd", background:isFav?"#ffe8e8":"#f7f7f7"}}
          >
            {isFav ? "Убрать" : "В избранные"}
          </button>
        </div>
      </div>
    </div>
  );
}