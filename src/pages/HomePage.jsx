export default function HomePage() {
  return (
    <div>
      <h1 style={{color:"red"}}>ЦЕ ГОЛОВНА СТОРІНКА</h1>
      <button onClick={() => (window.location.href = "/catalog")}>View Now</button>
    </div>
  );
}