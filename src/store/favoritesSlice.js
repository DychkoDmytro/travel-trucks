import { createSlice } from "@reduxjs/toolkit";

const initial = JSON.parse(localStorage.getItem("favorites") || "[]");

const favSlice = createSlice({
  name: "favorites",
  initialState: { ids: initial },   // массив id кемперов
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      const i = state.ids.indexOf(id);
      if (i === -1) state.ids.push(id);
      else state.ids.splice(i, 1);
      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
    clearFavorites(state) {
      state.ids = [];
      localStorage.setItem("favorites", "[]");
    }
  }
});

export const { toggleFavorite, clearFavorites } = favSlice.actions;
export default favSlice.reducer;