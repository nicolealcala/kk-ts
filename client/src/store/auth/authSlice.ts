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
  { rejectValue: string }
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
    if (error instanceof Error || error instanceof AuthError)
      return rejectWithValue(error.message);
    return rejectWithValue("An error occured");
  }
});

export const signUpUser = createAsyncThunk<
  Session | null,
  Pick<SignupFormInputs, "email" | "confirmPassword">,
  { rejectValue: string }
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
      if (error instanceof Error || error instanceof AuthError)
        return rejectWithValue(error.message);
      return rejectWithValue("An error occured");
    }
  },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("[REDUX] Logout error: ", error);
      if (error instanceof Error || error instanceof AuthError)
        return rejectWithValue(error.message);
      return rejectWithValue("An error occured");
    }
  },
);

export type AuthMode = "login" | "signup" | null;

interface AuthState {
  formType: AuthMode;
  error: string | null;
  session: Session | null;
}

const initialState: AuthState = {
  formType: "login",
  error: null,
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<AuthMode>) => {
      state.formType = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    clearAuth: (state) => {
      state.error = null;
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Success Matcher for Log out
      .addCase(logoutUser.fulfilled, (state) => {
        state.session = null;
        state.error = null;
      })
      // Success Matcher for Login & Signup
      .addMatcher(
        isAnyOf(loginUser.fulfilled, signUpUser.fulfilled),
        (state, action) => {
          state.session = action.payload;
          state.error = null;
        },
      )
      // Reject Matcher for Login, Signup, and Logout
      .addMatcher(
        isAnyOf(loginUser.rejected, signUpUser.rejected, logoutUser.rejected),
        (state, action) => {
          if (action.payload) {
            state.error = action.payload;
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
