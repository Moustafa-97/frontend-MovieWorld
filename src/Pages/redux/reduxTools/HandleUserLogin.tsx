import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const HandleUserLogin = createSlice({
  name: "handleUserLogin",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userData } = HandleUserLogin.actions;
export default HandleUserLogin.reducer;
