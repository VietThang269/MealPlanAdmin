import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    requestGetCustomers(state, action) {
      state.loading = true;
    },

    responseGetCustomers(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const selectDataCustomer = (state) => state.customer.data;

// Action creators are generated for each case reducer function
export const { requestGetCustomers, responseGetCustomers } =
  customerSlice.actions;

export default customerSlice.reducer;
