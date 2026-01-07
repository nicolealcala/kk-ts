import { createContext, useContext } from "react";
import { AuthError, type Session } from "@supabase/supabase-js";
export type AuthMode = "login" | "signup" | null;

export interface Auth {
  authMode: AuthMode;
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
  authError: AuthError | null;
  setAuthError: React.Dispatch<React.SetStateAction<AuthError | null>>;
  authSession: Session | null;
  setAuthSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const AuthContext = createContext<Auth | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
