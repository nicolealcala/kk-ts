import { AuthContext, type AuthMode } from "@/lib/contexts/AuthContext";
import type { AuthError, Session } from "@supabase/supabase-js";
import { useState } from "react";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [authSession, setAuthSession] = useState<Session | null>(null);

  return (
    <AuthContext
      value={{
        authMode,
        setAuthMode,
        authError,
        setAuthError,
        authSession,
        setAuthSession,
      }}
    >
      {children}
    </AuthContext>
  );
}
