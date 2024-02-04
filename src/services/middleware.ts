import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "./store";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Order } from "../components/orders-list/order-card/order-card.types";

export type ActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    wsSetOrderList: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (actions: ActionTypes): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';
  
        return next => action => {
          const { dispatch } = store;
          const { connect, disconnect, wsOpen: onOpen, 
            wsClose: onClose, onError, wsSetOrderList, wsConnecting } = actions;
  
          if (connect.match(action)) {
            console.log('connect')
            url = action.payload;
            socket = new WebSocket(url);
            isConnected = true;
            dispatch(wsConnecting());
          }
  
          if (socket) {
            socket.onopen = () => {
              dispatch(onOpen());
            };
    
            socket.onerror = err  => {
              console.log('error', err)
            };
    
            socket.onmessage = event => {
              const { data } = event;
              const parsedData = JSON.parse(data);
              let { orders, total, totalToday } = parsedData;
              orders = orders.map((element: Omit<Order, 'ingredients'> & { ingredients: string[]; }) => {
                const ingredients = element.ingredients.map((ingr: string) => store.getState().ingredients.ingredients.data.find(ingred => ingred._id === ingr));
                return {...element, ingredients};
              });
            
              dispatch(wsSetOrderList({ orders, total, totalToday }));
            };
    
            socket.onclose = event => {
              if (event.code !== 1000) {
                console.log('error')
                dispatch(onError(event.code.toString()));
              }
              console.log('close')
              dispatch(onClose());
  
              if (isConnected) {
                dispatch(wsConnecting());
                reconnectTimer = window.setTimeout(() => {
                  dispatch(connect(url));
                }, 3000)
              }
            };
  
            if (disconnect.match(action)) {
              console.log('disconnect')
              clearTimeout(reconnectTimer)
              isConnected = false;
              reconnectTimer = 0;
              socket.close();
              dispatch(onClose());
            }
          }
    
          next(action);
        };
      };

}
