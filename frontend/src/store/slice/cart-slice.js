import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cartItems = state.cartItems.concat(item);
      }
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i._id !== action.payload._id
      );
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload.shippingInfo;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
