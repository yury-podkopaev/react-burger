import { createSlice } from "@reduxjs/toolkit";
import { IngredientDetailsProps } from "../components/burger-ingredients/ingredient-details/ingredient-details.types";
import { RootState } from "./store";
import { v4 as uuidv4 } from "uuid";

export const initialState: {
  bun: IngredientDetailsProps | null;
  burger: IngredientDetailsProps[];
} = {
  bun: null,
  burger: [],
};

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const uuid = uuidv4();
      state.burger.push({ ...action.payload, uuid });
    },
    removeIngredient: (state, action) => {
      state.burger = state.burger.filter(
        (burger) => burger.uuid !== action.payload.uuid
      );
    },
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.burger = [];
    },
    reorderBurgerConstructor: (state, action) => {
      state.burger.splice(
        action.payload.dragIndex,
        0,
        state.burger.splice(action.payload.hoverIndex, 1)[0]
      );
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  clearBurgerConstructor,
  reorderBurgerConstructor,
} = constructorSlice.actions;
export const burgerConstructorReducer = constructorSlice.reducer;
export const selectBurgerConstructor = (state: RootState) =>
  state.burger.burger;
export const selectBun = (state: RootState) => state.burger.bun;
