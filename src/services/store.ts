import { compose, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientReducer } from './burger-ingredients.store';
import { burgerConstructorReducer } from './burger-constructor.store';
import { currentIngredientReducer } from './current-ingredient.store';
import { orderReducer } from './order.store';
import { authReducer } from './auth.store';
import { userReducer } from './user.store';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

export const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burger: burgerConstructorReducer,
        currentIngredient: currentIngredientReducer,
        order: orderReducer,
        auth: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
