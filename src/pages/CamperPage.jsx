import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCamperById } from "../api/campersApi";

export default function CamperPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [ok, setOk] = useState("loading"); // loading | ok | error

  useEffect(() => {
    (async () => {
      try {
        const data = await getCamperById(id);
        setCamper(data);
        setOk("ok");
      } catch {
        setOk("error");
      }
    })();
  }, [id]);

  if (ok === "loading") return <p>Loading...</p>;
  if (ok === "error")   return <p style={{color:"red"}}>Помилка завантаження</p>;
  if (!camper)          return null;

  const gallery = camper.gallery?.map(g => g.thumb || g.original) ?? [];
  const details = camper.details ?? {};

  const specKeys = ["transmission","engine","AC","bathroom","kitchen","TV","radio","refrigerator","microwave","gas","water"];
  const infoKeys = ["form","length","width","height","tank","consumption"];

  return (
    <div style={{display:"grid", gap:16}}>
      <h1>{camper.name}</h1>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        {gallery.map((src, i) => (
          <img key={i} src={src} alt={`${camper.name} ${i}`}
               style={{width:220, height:140, objectFit:"cover", borderRadius:8}}/>
        ))}
      </div>

      <p><b>Ціна:</b> €{Number(camper.price).toFixed(2)}</p>
      {camper.description && <p>{camper.description}</p>}

      <div style={{display:"flex", gap:24, flexWrap:"wrap"}}>
        <div>
          <h3>Характеристики</h3>
          <ul>
            {specKeys.filter(k => details[k] != null || camper[k] != null)
              .map(k => <li key={k}>{k}: {String(details[k] ?? camper[k])}</li>)}
          </ul>
        </div>
        <div>
          <h3>Деталі</h3>
          <ul>
            {infoKeys.filter(k => details[k] != null)
              .map(k => <li key={k}>{k}: {details[k]}</li>)}
          </ul>
        </div>
      </div>

      <div>
        <h3>Відгуки</h3>
        {(camper.reviews ?? []).map((r, i) => (
          <div key={i} style={{borderTop:"1px solid #eee", padding:"8px 0"}}>
            <strong>{r.reviewer_name}</strong>{" "}
            <span>{"★".repeat(r.reviewer_rating || 0)}</span>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Бронювання</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          alert("Бронювання успішне! ✅");
          e.target.reset();
        }} style={{display:"grid", gap:8, maxWidth:320}}>
          <input name="name" placeholder="Ваше ім'я" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="date" type="date" required />
          <button type="submit" style={{padding:"10px 14px", borderRadius:8}}>
            Забронювати
          </button>
        </form>
      </div>
    </div>
  );
}