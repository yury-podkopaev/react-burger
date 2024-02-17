import { getUser, updateUser, userReducer, initialState } from "../../services/user.store";

const validUser = {
  name: "Test",
  email: "user@mail.co",
  password: "qwerty123123",
};

describe("user reducer", () => {
  it("should return initial state", () => {
    expect(userReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set user data on retrival", () => {
    expect(
      userReducer(initialState, getUser.fulfilled({ user: validUser }, ""))
    ).toEqual({
      ...initialState,
      isLoading: false,
      user: { ...validUser, password: "" },
    });
  });

  it("should update user correctly", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(
      userReducer(
        {
          ...initialState,
          isLoading: false,
          user: validUser,
        },
        updateUser.fulfilled({ ...validUser, name: "NEW name" }, "", validUser)
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      user: { ...validUser, name: "NEW name" },
    });

    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it("should show error message on rejection", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(
      userReducer(
        initialState,
        updateUser.rejected({ message: "ERROR", name: "error" }, "", validUser)
      )
    ).toEqual(initialState);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("ERROR");
  });
});
