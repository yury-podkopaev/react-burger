import {
  WebsocketStatus,
  orderListReducer,
  wsClose,
  wsOpen,
  wsSetOrderList,
  initialState,
} from "../../services/orderList.store";

const validOrder = {
  name: "some order",
  ingredients: ["10d64577-af2c-4e15-81bb-9e6844340c95"],
  _id: "10d64577-af2c-4e15-81bb-9e6844340c95",
  status: "active",
  number: 200,
  createdAt: "date",
  updatedAt: "another date",
};

describe("orderList reducer", () => {
  it("should return initial state", () => {
    expect(orderListReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set correct connection state on opening", () => {
    expect(orderListReducer(initialState, wsOpen())).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("should set correct connection state on closing", () => {
    expect(orderListReducer(initialState, wsClose())).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should set order list om receiving", () => {
    expect(
      orderListReducer(
        initialState,
        wsSetOrderList({ total: 12, totalToday: 2, orders: [validOrder] })
      )
    ).toEqual({
      ...initialState,
      orderList: { total: 12, totalToday: 2, orders: [validOrder] },
    });
  });
});
