import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    productAction(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
  },
});

export const { productAction, startLoading } = productsSlice.actions;
export default productsSlice.reducer;
