import { createSlice } from "@reduxjs/toolkit";
import { IngredientDetailsProps } from "../components/burger-ingredients/ingredient-details/ingredient-details.types";
import { RootState } from "../components/app/store";
import { INGREDIENT_TYPE } from "../constants";
import { v4 as uuidv4 } from "uuid";

const initialState: { burger: IngredientDetailsProps[]} = {
  burger: [],
};

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        if (action.payload.type !== INGREDIENT_TYPE.BUN) {
          state.burger.push(action.payload);
        } else if (
          state.burger.find((item) => item.type === INGREDIENT_TYPE.BUN)
        ) {
          state.burger = state.burger.map((item) => {
            if (item.type === INGREDIENT_TYPE.BUN) {
              item = action.payload;
            }
            return item;
          });
        } else {
          state.burger.push(action.payload);
          state.burger.push(action.payload);
        }
      },
      prepare: (item) => {
        const uuid = uuidv4();
        return { payload: { ...item, uuid }, meta: null, error: null };
      },
    },
    removeIngredient: (state, action) => {
      state.burger = state.burger.filter(
        (burger: IngredientDetailsProps) => burger.uuid !== action.payload.uuid
      );
    },
    clearBurgerConstructor: (state) => {
        state.burger = [];
    },
    reorderBurgerConstructor: (state, action) => {
        state.burger.splice(action.payload.dragIndex, 0, state.burger.splice(action.payload.hoverIndex, 1)[0]);
    },
  },
});

export const { addIngredient, removeIngredient, clearBurgerConstructor, reorderBurgerConstructor } = constructorSlice.actions;
export const burgerConstructorReducer = constructorSlice.reducer;
export const selectBurgerConstructor = (state: RootState) =>
  state.burger.burger;
