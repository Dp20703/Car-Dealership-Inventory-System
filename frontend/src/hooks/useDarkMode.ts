import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;

  // No explicit preference saved yet — fall back to OS setting
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Persisted dark-mode toggle. Keeps <html class="dark"> in sync with
 * localStorage so the theme survives reloads and is consistent across tabs.
 */
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }, [isDark]);

  // Stay in sync if the user changes theme in another tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setIsDark(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggle };
};
