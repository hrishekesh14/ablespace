"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AccentColor, ThemeMode } from "@/types";
import { ACCENT_STORAGE_KEY, THEME_STORAGE_KEY } from "@/constants/theme";

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Reads persisted theme preferences synchronously (before paint) via the
 * inline script in app/layout.tsx, then keeps state + DOM attributes in
 * sync on change. This avoids a flash of the wrong theme on reload.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [accent, setAccentState] = useState<AccentColor>("blue");

  useEffect(() => {
    const root = document.documentElement;
    const storedMode = (root.dataset.theme as ThemeMode) || "light";
    const storedAccent = (root.dataset.accent as AccentColor) || "blue";
    setModeState(storedMode);
    setAccentState(storedAccent);
  }, []);

  const applyMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  const applyAccent = useCallback((next: AccentColor) => {
    setAccentState(next);
    document.documentElement.dataset.accent = next;
    window.localStorage.setItem(ACCENT_STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ mode, accent, setMode: applyMode, setAccent: applyAccent }),
    [mode, accent, applyMode, applyAccent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
