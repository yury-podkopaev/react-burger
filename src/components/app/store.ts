import { configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientReducer } from '../../services/burger-ingredients.store';
import { burgerConstructorReducer } from '../../services/burger-constructor.store';
import { currentIngredientReducer } from '../../services/current-ingredient.store';
import { orderReducer } from '../../services/order.store';

export const store = configureStore({
    reducer: {
        ingredients: ingredientReducer,
        burger: burgerConstructorReducer,
        currentIngredient: currentIngredientReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;