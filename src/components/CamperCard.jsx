import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../store/favoritesSlice";
import s from "./CamperCard.module.css";

const priceUi = (n) => Number(n).toFixed(2).replace(".", ",");

export default function CamperCard({ camper }) {
  const img = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;
  const favIds = useSelector((st) => st.favorites.ids);
  const isFav = favIds.includes(String(camper.id));
  const dispatch = useDispatch();

  return (
    <div className={s.card}>
      <img className={s.img} src={img} alt={camper.name} />
      <div className={s.body}>
        <div className={s.row}>
          <h3 className={s.name}>{camper.name}</h3>
          <div className={s.price}>€{priceUi(camper.price)}</div>
        </div>

        {camper.location && <div className={s.loc}>📍 {camper.location}</div>}

        <div className={s.btns}>
          <Link to={`/catalog/${camper.id}`} target="_blank" className={s.more}>
            Show more
          </Link>

          <button
            className={s.fav}
            aria-pressed={isFav}
            onClick={() => dispatch(toggleFav(camper.id))}
            title={isFav ? "Прибрати з обраних" : "Додати в обрані"}
          >
            {isFav ? "★ В обраному" : "☆ Додати"}
          </button>
        </div>
      </div>
    </div>
  );
}