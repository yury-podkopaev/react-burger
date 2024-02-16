import {
  fetchIngredients,
  reducer,
} from "../../services/burger-ingredients.store";

const initialState = {
  ingredients: { data: [], success: false },
  isLoading: true,
  isError: false,
};

const validIngredient = {
  _id: "10d64577-af2c-4e15-81bb-9e6844340c95",
  name: "Test name",
  type: "bun",
  proteins: 12,
  fat: 10,
  carbohydrates: 20,
  calories: 45,
  price: 500,
  image: "/url/image",
  image_mobile: "/url/mobile",
  image_large: "/url/large",
};

describe("burger ingredients reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should fetch ingredients", () => {
    expect(
      reducer(
        initialState,
        fetchIngredients.fulfilled(
          { data: [validIngredient], success: true },
          ""
        )
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: { data: [validIngredient], success: true },
    });
  });

  it("should set error if fetching failed", () => {
    expect(reducer(initialState, fetchIngredients.rejected(null, ""))).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
