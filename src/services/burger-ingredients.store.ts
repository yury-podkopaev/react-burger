import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IngredientDetailsProps } from "../components/burger-ingredients/ingredient-details/ingredient-details.types";
import { fetchWithRefresh } from "../utils/fetch-with-refresh";

export const fetchIngredients = createAsyncThunk(
  "fetchIngredients",
  async () => {
     return await fetchWithRefresh('/ingredients', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

const initialState: {
  ingredients: { data: IngredientDetailsProps[]; success: boolean };
  isLoading: boolean;
  isError: boolean;
} = {
  ingredients: { data: [], success: false },
  isLoading: true,
  isError: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredients.data = [];
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reducer } = ingredientsSlice;
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients.data;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsIsError = (state: RootState) =>
  state.ingredients.isError;
