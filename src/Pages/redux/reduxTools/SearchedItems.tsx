import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface TTTestState {
  loading: boolean;
  user: User | {};
  error: any | string;
}

export const fetchUser = createAsyncThunk("/user/fetchUser", () => {
  return axios.post("http://localhost:8000/login").then((resp) => resp.data);
});

const TTTest = createSlice({
  name: "test",
  initialState: {
    loading: false,
    user: {},
    error: "",
  } as TTTestState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.user = action.payload[0] || {};
        state.error = "yess";
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export default TTTest.reducer;
