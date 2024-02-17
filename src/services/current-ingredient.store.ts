import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IngredientDetailsProps } from "../components/burger-ingredients/ingredient-details/ingredient-details.types";

export const initialState: { currentIngredient: IngredientDetailsProps } = {
  currentIngredient: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
  },
};

export const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = initialState.currentIngredient;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } = currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
export const selectCurrentIngredient = (state: RootState) =>
  state.currentIngredient.currentIngredient;
