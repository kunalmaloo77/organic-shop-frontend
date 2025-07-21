import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { useEffect } from "react";

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("items");
  if (localCartData === null) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};
const getTotalLocalQuantityData = () => {
  let totalLocalQuantityData = localStorage.getItem("totalQuantity");
  if (totalLocalQuantityData === null) {
    return 0;
  } else {
    return JSON.parse(totalLocalQuantityData);
  }
};
const addtocartSlice = createSlice({
  name: "addtocart",
  initialState: {
    items: getLocalCartData(),
    totalQuantity: getTotalLocalQuantityData(),
    IsVisible: false,
    IsMobVisible: false,
  },
  reducers: {
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + quantity, // Update the quantity of the specific item
          };
        }
        return item;
      });

      state.items = updatedItems;
      localStorage.setItem("items", JSON.stringify(state.items));
      toast.success("cart updated");
    },
    updateItemCart(state, action) {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map((item) => {
        if (item._id === id) {
          state.totalQuantity -= item.quantity - quantity;
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });

      state.items = updatedItems;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    totalQuantityAction(state, action) {
      state.totalQuantity += action.payload;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    addtocartAction(state, action) {
      state.items = [...state.items, action.payload];
      localStorage.setItem("items", JSON.stringify(state.items));
      toast.success("Item added to cart");
    },
    removefromcartAction(state, action) {
      const itemKey = action.payload;
      state.items = state.items.filter((item) => item.key !== itemKey);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    isVisibleAction(state, action) {
      state.IsVisible = action.payload;
    },
    isVisibleMobileAction(state, action) {
      state.IsMobVisible = action.payload;
    },
    emptyCartAction(state) {
      state.items = [];
      state.totalQuantity = 0;
      localStorage.removeItem("items");
      localStorage.removeItem("totalQuantity");
    },
  },
});

export const {
  totalQuantityAction,
  isVisibleAction,
  addtocartAction,
  updateItemQuantity,
  isVisibleMobileAction,
  removefromcartAction,
  updateItemCart,
  emptyCartAction,
} = addtocartSlice.actions;
export default addtocartSlice.reducer;
