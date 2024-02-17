import {
  addIngredient,
  burgerConstructorReducer,
  clearBurgerConstructor,
  removeIngredient,
  reorderBurgerConstructor,
  setBun,
  initialState,
} from "../../services/burger-constructor.store";

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

describe("burger constructor reducer", () => {
  it("should return initial state", () => {
    expect(burgerConstructorReducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should add ingredient to the burger", () => {
    expect(
      burgerConstructorReducer(initialState, addIngredient(validIngredient))
    ).toEqual({
      ...initialState,
      burger: [expect.objectContaining(validIngredient)],
    });
  });

  it("should remove ingredient from the burger", () => {
    expect(
      burgerConstructorReducer(
        { ...initialState, burger: [{ ...validIngredient, uuid: "123" }] },
        removeIngredient({ uuid: "123" })
      )
    ).toEqual(initialState);
  });

  it("should set bun", () => {
    expect(
      burgerConstructorReducer(initialState, setBun(validIngredient))
    ).toEqual({ ...initialState, bun: validIngredient });
  });

  it("should clear the constructor", () => {
    expect(
      burgerConstructorReducer(
        { bun: validIngredient, burger: [validIngredient] },
        clearBurgerConstructor()
      )
    ).toEqual(initialState);
  });

  it("should reorder constructor", () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          burger: [validIngredient, { ...validIngredient, _id: "312" }],
        },
        reorderBurgerConstructor({ dragIndex: 1, hoverIndex: 0 })
      )
    ).toEqual({
      ...initialState,
      burger: [{ ...validIngredient, _id: "312" }, validIngredient],
    });
  });
});
