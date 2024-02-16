import {
  clearCurrentOrder,
  getOrder,
  orderReducer,
  sendOrder,
  setCurrentOrder,
} from "../../services/order.store";

const initialState = {
  newOrder: { name: "", order: { number: 0 } },
  currentOrder: {
    name: "",
    ingredients: [],
    _id: "",
    status: "",
    number: 0,
    createdAt: "",
    updatedAt: "",
  },
};

const validOrderData = { name: "Supertest", order: { number: 123 } };

const validOrder = {
  name: "some order",
  ingredients: [
      "10d64577-af2c-4e15-81bb-9e6844340c95",
  ],
  _id: "10d64577-af2c-4e15-81bb-9e6844340c95",
  status: "active",
  number: 200,
  createdAt: "date",
  updatedAt: "another date",
};

describe("order reducer", () => {
  it("should return initial state", () => {
    expect(orderReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set current order", () => {
    expect(orderReducer(initialState, setCurrentOrder(validOrder))).toEqual({
      ...initialState,
      currentOrder: validOrder,
    });
  });

  it("should clear current order", () => {
    expect(
      orderReducer(
        { ...initialState, currentOrder: validOrder },
        clearCurrentOrder()
      )
    ).toEqual(initialState);
  });

  it("should set order data if it was sent successfully", () => {
    expect(
      orderReducer(initialState, sendOrder.fulfilled(validOrderData, "", []))
    ).toEqual({ ...initialState, newOrder: validOrderData });
  });

  it("should clear order data if it was rejected", () => {
    expect(
      orderReducer(
        { ...initialState, newOrder: validOrderData },
        sendOrder.rejected(null, "", [])
      )
    ).toEqual(initialState);
  });

  it("should get and save order data", () => {
    expect(
      orderReducer(
        initialState,
        getOrder.fulfilled(
          validOrder,
          "",
          3212
        )
      )
    ).toEqual({
      ...initialState,
      currentOrder: validOrder,
    });
  });
});
