"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark"); // Default to dark
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  // Get system theme preference
  const getSystemTheme = useCallback((): "dark" | "light" => {
    if (typeof window === "undefined") return "dark";
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("dark", "light");
    
    let resolved: "dark" | "light";
    
    if (newTheme === "system") {
      resolved = getSystemTheme();
    } else {
      resolved = newTheme;
    }
    
    // Apply the resolved theme
    root.classList.add(resolved);
    
    // Update state only if different to avoid unnecessary re-renders
    setResolvedTheme(prev => prev !== resolved ? resolved : prev);
  }, [getSystemTheme]);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme-preference", newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // Initialize theme on mount - avoid setState in effect
  useEffect(() => {
    // Get saved preference
    const savedTheme = localStorage.getItem("theme-preference");
    
    // Apply the theme directly to DOM (no state updates in effect)
    const initialTheme: Theme = (savedTheme && ["dark", "light", "system"].includes(savedTheme)) 
      ? savedTheme as Theme
      : "dark";
    
    // Apply to DOM using requestAnimationFrame to avoid setState in effect
    requestAnimationFrame(() => {
      const root = document.documentElement;
      root.classList.remove("dark", "light");
      
      let resolved: "dark" | "light";
      if (initialTheme === "system") {
        resolved = getSystemTheme();
      } else {
        resolved = initialTheme;
      }
      
      root.classList.add(resolved);
      setResolvedTheme(resolved);
      setThemeState(initialTheme);
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = () => {
      // Only update if in system mode
      const currentTheme = localStorage.getItem("theme-preference");
      if (currentTheme === "system") {
        const newSystemTheme = getSystemTheme();
        setResolvedTheme(newSystemTheme);
        
        // Update document class
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [getSystemTheme]);

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}