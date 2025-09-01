import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import Cookies from "js-cookie";


type User = {
  email: string;
  id: string;
  name: string;
  role: "USER" | "SUPERADMIN"; // Add other roles if needed
};

type TAuthState = {
  user: null | User;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      Cookies.set("accessToken", token, { expires: 30 });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from cookies
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
