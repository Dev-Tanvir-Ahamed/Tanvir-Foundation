import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the shape of your user object
interface TUser {
  id: string;
  name: string;
  email: string;
}
// Define the user state as either null or TUser
interface AuthState {
  token: string | null;
  user: TUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null, // Initialized as null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{ token: string; user: TUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
