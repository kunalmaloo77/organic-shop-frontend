// store.js
import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "../features/paginationSlice";
import addtocartReducer from "../features/addtocartSlice";
import productsReducer from "../features/productsSlice";
import loadingReducer from "../features/loadingSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationReducer, //name of slice is pagination
    addtocart: addtocartReducer, //name of slice is addtocart
    products: productsReducer, //name of slice is products
    loading: loadingReducer, // name of slice is loading
    auth: authReducer, //name of slice is auth
  },
});
