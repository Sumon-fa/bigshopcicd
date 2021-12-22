import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
  success:false,
    myOrdersData: [],
    order: {},
    totalAmount: 0,
    allOrder: [],
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
    loader(state) {
      state.isLoading = !state.isLoading;
    },
    orderCreate(state, action) {
      state.orderData = action.payload.orderData;
    },
    myOrders(state, action) {
      state.myOrdersData = action.payload.myOrdersData;
    },
    orderDetails(state, action) {
      state.order = action.payload.order;
    },
    allOrders(state, action) {
      state.allOrder = action.payload.allOrder;
      state.totalAmount = action.payload.totalAmount;
    },
    orderUpdate(state, action) {
      state.isUpdated = action.payload.isUpdated;
    },
    removeOrder(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
