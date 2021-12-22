import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "details",
  initialState: {
    product: { images: [] },
    isLoading: false,
    success: false,
  },
  reducers: {
    productDetails(state, action) {
      state.product = action.payload.product;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    createProduct(state, action) {
      state.success = action.payload.success;
    },
  },
});
export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice;
