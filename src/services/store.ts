import { compose, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientReducer } from './burger-ingredients.store';
import { burgerConstructorReducer } from './burger-constructor.store';
import { currentIngredientReducer } from './current-ingredient.store';
import { orderReducer } from './order.store';
import { authReducer } from './auth.store';
import { userReducer } from './user.store';
import { orderListReducer } from './orderList.store';
import { ActionTypes, socketMiddleware } from './middleware';
import { connect, disconnect, wsConnecting, onError } from './actions';
import { wsOpen, wsClose, wsSetOrderList } from './orderList.store';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const actions: ActionTypes = {
  connect: connect,
  disconnect: disconnect,
  wsOpen: wsOpen,
  wsClose: wsClose,
  wsSetOrderList: wsSetOrderList,
  wsConnecting: wsConnecting,
  onError: onError,
}

export const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burger: burgerConstructorReducer,
        currentIngredient: currentIngredientReducer,
        order: orderReducer,
        auth: authReducer,
        user: userReducer,
        orderList: orderListReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(socketMiddleware(actions));
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
