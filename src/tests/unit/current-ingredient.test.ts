import {
    clearCurrentIngredient,
  currentIngredientReducer,
  setCurrentIngredient,
  initialState,
} from "../../services/current-ingredient.store";

const validIngredient = {
  currentIngredient: {
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
  },
};

describe("current ingredient reducer", () => {
  it("should return initial state", () => {
    expect(currentIngredientReducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should set current ingredient", () => {
    expect(
      currentIngredientReducer(
        initialState,
        setCurrentIngredient(validIngredient.currentIngredient)
      )
    ).toEqual(validIngredient);
  });

  it('should clear current ingredient', () => {
    expect(currentIngredientReducer(validIngredient, clearCurrentIngredient())).toEqual(initialState);
  });
});
