// paginationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    totalPages: 1,
  },
  reducers: {
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;
