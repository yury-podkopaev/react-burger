import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithRefresh } from "../utils/fetch-with-refresh";
import { UserData } from "../pages/profile/user.types";
import { RootState } from "./store";

export const getUser = createAsyncThunk("getUser", async () => {
  return await fetchWithRefresh("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (userData: UserData) => {
    return await fetchWithRefresh("/auth/user", {
      method: "PATCH",
      body: JSON.stringify({ ...userData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

const initialState: UserData = { name: "", email: "", password: "" };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state = {...action.payload}
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state = {...action.payload};
            alert('Updated successfully');
        })
        .addCase(updateUser.rejected, (state, action) => {
          alert(action.error.message);
      })
    }
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
