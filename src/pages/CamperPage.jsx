import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCamperById } from "../api/campersApi";

const SPEC_BOOL = [
  "AC","bathroom","kitchen","TV","radio","refrigerator","microwave","gas","water"
]; // что есть/нет
const SPEC_TEXT = ["transmission","engine"]; // текстовые

const DETAILS = ["form","length","width","height","tank","consumption"]; // детальные поля

export default function CamperPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("features"); // features | reviews | booking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const d = await getCamperById(id);
        if (!ignore) setData(d);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!data)   return <p>Не знайдено</p>;

  return (
    <div style={{display:"grid", gap:16}}>
      <h1>{data.name}</h1>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        {data.gallery?.slice(0,6).map((p, i) => (
          <img key={i} src={p.thumb || p.original} alt="" width={160} height={110} style={{objectFit:"cover", borderRadius:8, border:"1px solid #eee"}} />
        ))}
      </div>
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        <strong style={{fontSize:18}}>€{Number(data.price).toFixed(2).replace(".", ",")}</strong>
        <span style={{color:"#777"}}>• 📍 {data.location}</span>
        <span style={{color:"#777"}}>• ⭐ {data.rating}</span>
      </div>

      <p>{data.description}</p>

      <div style={{display:"flex", gap:8}}>
        <button onClick={()=>setTab("features")} style={btn(tab==="features")}>Характеристики</button>
        <button onClick={()=>setTab("reviews")}  style={btn(tab==="reviews")}>Відгуки</button>
        <button onClick={()=>setTab("booking")}   style={btn(tab==="booking")}>Бронювання</button>
      </div>

      {tab==="features" && <Features data={data} />}
      {tab==="reviews"  && <Reviews reviews={data.reviews || []} />}
      {tab==="booking"  && <BookingForm camperName={data.name} />}
    </div>
  );
}

function btn(active){ return {padding:"8px 12px", borderRadius:8, border:"1px solid #ddd", background:active?"#eef5ff":"#f7f7f7"}; }

function Features({data}) {
  return (
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
      <div style={{border:"1px solid #eee", borderRadius:12, padding:12}}>
        <h3>Особливості</h3>
        <ul style={{margin:0, paddingLeft:16}}>
          {SPEC_TEXT.map(k => data[k] && <li key={k}><b>{k}:</b> {data[k]}</li>)}
          {SPEC_BOOL.map(k => data[k] === true && <li key={k}>{k}</li>)}
        </ul>
      </div>
      <div style={{border:"1px solid #eee", borderRadius:12, padding:12}}>
        <h3>Деталі</h3>
        <ul style={{margin:0, paddingLeft:16}}>
          {DETAILS.map(k => data[k] && <li key={k}><b>{k}:</b> {String(data[k])}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Reviews({reviews}) {
  if (!reviews.length) return <p>Відгуків ще немає</p>;
  return (
    <div style={{display:"grid", gap:12}}>
      {reviews.map((r, i) => (
        <div key={i} style={{border:"1px solid #eee", borderRadius:12, padding:12}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <strong>{r.reviewer_name}</strong>
            <span>{"★".repeat(r.reviewer_rating)}{"☆".repeat(5-r.reviewer_rating)}</span>
          </div>
          <p style={{margin:"8px 0 0"}}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

function BookingForm({camperName}) {
  function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    // Тут можно отправить на свой бекенд. Сейчас — просто нотификация.
    alert(`Бронювання успішне!\nКемпер: ${camperName}\nІм'я: ${payload.name}\nEmail: ${payload.email}\nДата: ${payload.date}\nПовідомлення: ${payload.message || "-"}`);
    e.currentTarget.reset();
  }
  return (
    <form onSubmit={onSubmit} style={{display:"grid", gap:10, maxWidth:420}}>
      <input required name="name"  placeholder="Ваше ім'я"  />
      <input required type="email" name="email" placeholder="Email" />
      <input required type="date"  name="date"  />
      <textarea name="message" rows={4} placeholder="Коментар"></textarea>
      <button type="submit" style={{padding:"10px 14px", borderRadius:8}}>Забронювати</button>
    </form>
  );
}