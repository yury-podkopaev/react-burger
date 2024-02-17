import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithRefresh } from "../utils/fetch-with-refresh";
import { UserData } from "../pages/profile/user.types";
import { RootState } from "./store";

export const getUser = createAsyncThunk("getUser", async () => {
  return await fetchWithRefresh<{ user: UserData}>("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (userData: UserData) => {
    return await fetchWithRefresh<UserData>("/auth/user", {
      method: "PATCH",
      body: JSON.stringify({ ...userData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

export const initialState: {
  isLoading: boolean,
  isError: boolean,
  user: UserData,
} = {
  isLoading: true,
  isError: false,
  user: { name: "", email: "", password: "" },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = {...action.payload.user, password: ''};
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = {...action.payload};
            alert('Updated successfully');
        })
        .addCase(updateUser.rejected, (state, action) => {
          alert(action.error.message);
      })
    }
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsUserLoading = (state: RootState) => state.user.isLoading;
