import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthError, Session } from "@supabase/supabase-js";

export type AuthMode = "login" | "signup" | null;

interface AuthState {
  authMode: AuthMode;
  authError: AuthError | null;
  authSession: Session | null;
}

const initialState: AuthState = {
  authMode: "login",
  authError: null,
  authSession: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload;
    },
    setAuthError: (state, action: PayloadAction<AuthError | null>) => {
      state.authError = action.payload;
    },
    setAuthSession: (state, action: PayloadAction<Session | null>) => {
      state.authSession = action.payload;
    },
    clearAuth: (state) => {
      state.authError = null;
      state.authSession = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthMode, setAuthError, setAuthSession, clearAuth } =
  authSlice.actions;

//Main export is the slice reducer
export default authSlice.reducer;
