import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchWithRefresh } from "../utils/fetch-with-refresh";

const initialState: {
  name: string;
  order: { number: number };
} = {
  name: "",
  order: { number: 0 },
};

export const sendOrder = createAsyncThunk("sendOrder", async (ingredients: string[]) => {
    return await fetchWithRefresh("/orders", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
      headers: {
        "Content-Type": "application/json",
      },
    });
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.order.number = action.payload.order.number;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.name = "";
        state.order.number = 0;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const selectOrderNumber = (state: RootState) => state.order.order.number;
export const selectOrderName = (state: RootState) => state.order.name;
