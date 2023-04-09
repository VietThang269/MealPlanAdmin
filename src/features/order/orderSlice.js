import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    requestGetOrders(state, action) {
      state.loading = true;
    },

    responseGetOrders(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const selectDataOrder = (state) => state.order.data;

// Action creators are generated for each case reducer function
export const { requestGetOrders, responseGetOrders } = orderSlice.actions;

export default orderSlice.reducer;
