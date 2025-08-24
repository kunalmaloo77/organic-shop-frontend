import { createSlice } from "@reduxjs/toolkit";

const filterProductsSlice = createSlice({
  name: "filterProducts",
  initialState: {
    filteredProducts: [],
  },
  reducers: {
    filterAction(state, action) {
      state.filteredProducts = action.payload;
    },
  },
});

export const { filterAction } = filterProductsSlice.actions;
export default filterProductsSlice.reducer;
