import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "allProduct",
  initialState: {
    products: [],
    isLoading: false,
    productCount: 0,
    resPerPage: 0,
    isDeleted: false,
    isUpdated: false,
  },
  reducers: {
    allProduct(state, action) {
      state.productCount = action.payload.productCount;
      state.resPerPage = action.payload.resPerPage;
      state.products = action.payload.products;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    loader(state) {
      state.isLoading = !state.isLoading;
    },

    adminProducts(state, action) {
      state.products = action.payload.products;
    },
    removeProducts(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
    updateProduct(state, action) {
      state.isUpdated = action.payload.isUpdated;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
