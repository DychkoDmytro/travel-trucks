import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCampers } from "../api/campersApi";

export const fetchCampers = createAsyncThunk(
  "campers/fetch",
  async ({ page = 1, limit = 6, filters }, thunkAPI) => {
    const params = {};
    if (filters?.location) params.location = filters.location;
    if (filters?.form) params.form = filters.form;
    if (filters?.amenities) {
      Object.entries(filters.amenities).forEach(([k, v]) => {
        if (v) params[k] = true;
      });
    }
    const { items, total } = await getCampers({ page, limit, params });
    return { items, total, page };
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: { items: [], total: 0, page: 1, status: "idle" },
  reducers: {
    resetList: (s) => {
      s.items = [];
      s.total = 0;
      s.page = 1;
      s.status = "idle";
    },
    setPage: (s, a) => {
      s.page = a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCampers.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchCampers.fulfilled, (s, a) => {
        const { items, total, page } = a.payload;
        s.items = page === 1 ? items : [...s.items, ...items];
        s.total = total;
        s.page = page;
        s.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (s) => {
        s.status = "failed";
      });
  },
});

export const { resetList, setPage } = campersSlice.actions;
export default campersSlice.reducer;