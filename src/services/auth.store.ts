import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUrl } from "../utils/fetch-url";
import { RootState } from "./store";
import { UserData } from "../pages/profile/user.types";

export const login = createAsyncThunk("login", async (userData: any) => {
  return await fetchUrl("/auth/login", {
    method: "POST",
    body: JSON.stringify({ ...userData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const register = createAsyncThunk("register", async (userData: UserData) => {
  return await fetchUrl("/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...userData }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const logout = createAsyncThunk("logout", async (token: string) => {
  return await fetchUrl("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const initialState = {
  isAuthChecked: !!localStorage.getItem("token") ?? false,
  isAuthorized: !!localStorage.getItem("token") ?? false,
  user: { name: "", email: "", password: "" },
  token: localStorage.getItem("token") ?? '',
  refreshToken: localStorage.getItem("refreshToken") ?? "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {state.isAuthChecked = action.payload},
    setToken: (state, action) => {state.token = action.payload},
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthorized = true;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    })
    .addCase(register.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
    })
    .addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');      
      state.user = {...initialState.user};
      state.isAuthorized = false;
      state.isAuthChecked = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { setIsAuthChecked, setToken } = authSlice.actions;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
