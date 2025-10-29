import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./store/campersSlice";
import filtersReducer from "./store/filtersSlice";
import favReducer from "./store/favoritesSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favReducer,
  },
});

export default store;