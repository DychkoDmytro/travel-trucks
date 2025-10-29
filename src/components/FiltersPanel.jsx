import { useSelector, useDispatch } from "react-redux";
import { setLocation, setForm, toggleFeature, resetFilters } from "../store/filtersSlice";

export default function FiltersPanel({ onApply }) {
  const filters = useSelector((st) => st.filters);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        background: "#f8f9fa",
      }}
    >
      <h3>Фільтри</h3>

      <div style={{ marginBottom: 10 }}>
        <label>
          Локація:
          <input
            value={filters.location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            style={{ marginLeft: 10 }}
            placeholder="Введіть місто..."
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Тип кузова:
          <select
            value={filters.form}
            onChange={(e) => dispatch(setForm(e.target.value))}
            style={{ marginLeft: 10 }}
          >
            <option value="">Усі</option>
            <option value="alcove">Alcove</option>
            <option value="panelTruck">Panel Truck</option>
            <option value="fullyIntegrated">Fully Integrated</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="checkbox"
            checked={filters.features.kitchen}
            onChange={() => dispatch(toggleFeature("kitchen"))}
          />
          🍳 Кухня
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={filters.features.shower}
            onChange={() => dispatch(toggleFeature("shower"))}
          />
          🚿 Душ
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={filters.features.airConditioner}
            onChange={() => dispatch(toggleFeature("airConditioner"))}
          />
          ❄️ Кондиціонер
        </label>
      </div>

      <button
        onClick={onApply}
        style={{ marginRight: 10, padding: "6px 12px", cursor: "pointer" }}
      >
        Застосувати
      </button>
      <button onClick={() => dispatch(resetFilters())}>Скинути</button>
    </div>
  );
}