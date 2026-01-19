import supabase from "@/lib/config/supabaseClient";
import type { LoginFormInputs } from "@/lib/forms/loginFormSchema";
import type { SignupFormInputs } from "@/lib/forms/signUpFormSchema";
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AuthError, type Session } from "@supabase/supabase-js";

export const loginUser = createAsyncThunk<
  Session | null,
  LoginFormInputs,
  { rejectValue: AuthError }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data.session;
  } catch (error) {
    console.error("[REDUX] Login error: ", error);
    return rejectWithValue(error as AuthError);
  }
});

export const signUpUser = createAsyncThunk<
  Session | null,
  Pick<SignupFormInputs, "email" | "confirmPassword">,
  { rejectValue: AuthError }
>(
  "auth/signUpUser",
  async ({ email, confirmPassword }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: confirmPassword,
      });

      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error("[REDUX] Signup error: ", error);
      return rejectWithValue(error as AuthError);
    }
  },
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: AuthError }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("[REDUX] Logout error: ", error);
    return rejectWithValue(error as AuthError);
  }
});

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
  extraReducers: (builder) => {
    builder
      //Success Matcher for Log out
      .addCase(logoutUser.fulfilled, (state) => {
        state.authSession = null;
        state.authError = null;
      })
      // Success Matcher for Login & Signup
      .addMatcher(
        isAnyOf(loginUser.fulfilled, signUpUser.fulfilled),
        (state, action) => {
          state.authSession = action.payload;
          state.authError = null;
        },
      )
      // Reject Matcher for Login, Signup, and Logout
      .addMatcher(
        isAnyOf(loginUser.rejected, signUpUser.rejected, logoutUser.rejected),
        (state, action) => {
          if (action.payload) {
            state.authError = action.payload as AuthError;
          }
        },
      );
  },
});

// Action creators are generated for each case reducer function
export const { setAuthMode, setAuthError, setAuthSession, clearAuth } =
  authSlice.actions;

//Main export is the slice reducer
export default authSlice.reducer;
