"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import type { Theme } from "@/contexts/theme-context";

const themeLabels: Record<Theme, string> = {
  dark: "Dark mode",
  light: "Light mode", 
  system: "System theme"
};

const themeIcons = {
  dark: Moon,
  light: Sun,
  system: Monitor,
};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleThemeChange = () => {
    const themes: Theme[] = ["dark", "light", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  // Use the resolved theme for the icon to show current visual state
  const IconComponent = theme === "system" 
    ? Monitor 
    : resolvedTheme === "dark" 
      ? Moon 
      : Sun;

  const currentLabel = themeLabels[theme];

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      aria-label={`Switch theme (current: ${currentLabel})`}
      title={`Current theme: ${currentLabel}. Click to cycle through options.`}
      className="transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <IconComponent className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="sr-only">Switch theme</span>
    </Button>
  );
}