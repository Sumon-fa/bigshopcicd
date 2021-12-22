import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/product-Slice";
import productDetailsSlice from "./slice/productDetails-slice";
import uiSlice from "./slice/ui-slice";
import authSlice from "./slice/auth-slice";
import userSlice from "./slice/user-slice";
import cartSlice from "./slice/cart-slice";
import orderSlice from "./slice/order-slice";
import reviewSlice from "./slice/review-slice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    ui: uiSlice.reducer,
    details: productDetailsSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    review: reviewSlice.reducer,
  },
});

export default store;
