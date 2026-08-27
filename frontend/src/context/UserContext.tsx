// ──────────────────────────────────────────────
// CRECE — User Context (session state + auth guard)
// ──────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserProfile } from "../types";

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = "crece_user";

function isValidUser(u: unknown): u is UserProfile {
  if (!u || typeof u !== "object") return false;
  const obj = u as Record<string, unknown>;
  return (
    typeof obj.id === "string" &&
    obj.id.length > 0 &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return isValidUser(parsed) ? (parsed as UserProfile) : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const setUser = (u: UserProfile | null) => {
    setUserState(u);
    if (u && isValidUser(u)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
