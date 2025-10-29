import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem("favIds")) ?? [];
  } catch {
    return [];
  }
};
const save = (ids) => localStorage.setItem("favIds", JSON.stringify(ids));

const favSlice = createSlice({
  name: "favorites",
  initialState: { ids: load() },
  reducers: {
    toggleFav: (s, a) => {
      const id = String(a.payload);
      s.ids = s.ids.includes(id)
        ? s.ids.filter((x) => x !== id)
        : [...s.ids, id];
      save(s.ids);
    },
  },
});

export const { toggleFav } = favSlice.actions;
export default favSlice.reducer;