import { AnyAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { authReducer, login, logout, register } from "../../services/auth.store";

const initialState = {
  isAuthChecked: false,
  isAuthorized: false,
  user: { name: "", email: "", password: "" },
  token: "",
  refreshToken: "",
};

const validUserResponse = {
  user: { name: "Test", email: "user@mail.co", password: "qwerty123123" },
  accessToken: "sometoken",
  refreshToken: "refreshToken",
};

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should save user data after login", () => {
    expect(
      authReducer(
        initialState,
        login.fulfilled(validUserResponse, "", {
          email: "user@mail.co",
          password: "qwerty123123",
        })
      )
    ).toEqual({
      isAuthChecked: true,
      isAuthorized: true,
      token: validUserResponse.accessToken,
      user: validUserResponse.user,
      refreshToken: validUserResponse.refreshToken,
    });
  });

  it("should login freshly created user", () => {
    expect(
      authReducer(
        initialState,
        register.fulfilled(validUserResponse, "", validUserResponse.user)
      )
    ).toEqual({
      isAuthChecked: false,
      isAuthorized: true,
      token: validUserResponse.accessToken,
      user: validUserResponse.user,
      refreshToken: validUserResponse.refreshToken,
    });
  });

  it('should clear data after logout', () => {
    expect(authReducer({
        isAuthChecked: true,
        isAuthorized: true,
        token: validUserResponse.accessToken,
        user: validUserResponse.user,
        refreshToken: validUserResponse.refreshToken,
      }, logout.fulfilled({payload: '', meta: ''} as RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>, '', ''))).toEqual(
        initialState
        );
  })

});
