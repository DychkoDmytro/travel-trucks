import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  features: {
    airConditioner: false,
    kitchen: false,
    shower: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    toggleFeature: (state, action) => {
      const key = action.payload;
      state.features[key] = !state.features[key];
    },
    resetFilters: () => initialState,
  },
});

export const { setLocation, setForm, toggleFeature, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;