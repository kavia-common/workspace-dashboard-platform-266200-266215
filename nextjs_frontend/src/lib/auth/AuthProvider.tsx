"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { AuthSession, AuthState, LoginInput } from "@/lib/auth/types";
import { clearSession, loadSession, saveSession } from "@/lib/auth/storage";

type AuthContextValue = {
  state: AuthState;
  token: string | null;
  session: AuthSession | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function makeDemoSession(email: string): AuthSession {
  const name = email.split("@")[0] || "User";
  return {
    user: {
      id: `user_${Math.random().toString(16).slice(2)}`,
      email,
      name,
    },
    // Demo token; once backend implements JWT, set real token here.
    token: `demo_${Math.random().toString(16).slice(2)}`,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setState({ status: "authenticated", session });
    } else {
      setState({ status: "anonymous" });
    }
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    // TODO (when backend is implemented): call real /auth/login here.
    // For now, accept any non-empty email/password as demo login.
    if (!input.email.trim() || !input.password.trim()) {
      throw new Error("Email and password are required.");
    }
    const session = makeDemoSession(input.email.trim());
    saveSession(session);
    setState({ status: "authenticated", session });
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setState({ status: "anonymous" });
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const session = state.status === "authenticated" ? state.session : null;
    return {
      state,
      session,
      token: session?.token ?? null,
      login,
      logout,
    };
  }, [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
