import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchWithRefresh } from "../utils/fetch-with-refresh";
import { Order } from "../components/orders-list/order-card/order-card.types";
import { IngredientDetailsProps } from "../components/burger-ingredients/ingredient-details/ingredient-details.types";

interface OrderData {
  name: string;
  order: { number: number };
}

const initialState: {
  newOrder: OrderData;
  currentOrder: Order;
} = {
  newOrder: { name: "", order: { number: 0 } },
  currentOrder: {
    name: "",
    ingredients: [],
    _id: "",
    status: "",
    number: 0,
    createdAt: "",
    updatedAt: "",
  },
};

export const sendOrder = createAsyncThunk(
  "sendOrder",
  async (ingredients: string[]) => {
    return await fetchWithRefresh<OrderData>("/orders", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

export const getOrder = createAsyncThunk(
  "getOrder",
  async (orderId: number, { getState }) => {
    //@ts-ignore
    const state: RootState = getState();
    
    const orderList = await fetchWithRefresh<{
      orders: (Omit<Order, "ingredients"> & { ingredients: string[] })[];
      success: boolean;
    }>(`/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ingredientsList: IngredientDetailsProps[] = state.ingredients.ingredients.data;
    const order = orderList.orders[0];
    return {
      ...order,
      ingredients: order.ingredients.map((item) => {
        return ingredientsList.find((ingredient) => ingredient._id === item);
      }),
    };
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = initialState.currentOrder;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.newOrder.name = action.payload.name;
        state.newOrder.order.number = action.payload.order.number;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.newOrder.name = "";
        state.newOrder.order.number = 0;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload as Order;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export const selectOrderNumber = (state: RootState) =>
  state.order.newOrder.order.number;
export const selectOrderName = (state: RootState) => state.order.newOrder.name;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
