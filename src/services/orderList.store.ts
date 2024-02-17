import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../components/orders-list/order-card/order-card.types";
import { RootState } from "./store";

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

interface OrderList {
    orders: Order[];
    total: number;
    totalToday: number;
};

export const initialState: {
    orderList: OrderList;
    status: WebsocketStatus,
    connectionError: string,
} = {
    orderList: {
        orders: [],
        total: 0,
        totalToday: 0,
    },
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
};

const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        wsOpen: (state) => {
          state.status = WebsocketStatus.ONLINE;
          state.connectionError = '';
        },
        wsClose: (state) => {
          state.status = WebsocketStatus.OFFLINE;
        },
        wsSetOrderList: (state, action) => {
          state.orderList = action.payload;
        },
    }
});

export const orderListReducer = orderListSlice.reducer;
export const { wsOpen, wsClose, wsSetOrderList } = orderListSlice.actions;
export const selectOrderList = (state: RootState) => state.orderList.orderList;
