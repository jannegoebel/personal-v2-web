import type { Theme } from "./theme-context";

export function resolveSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function isDarkTheme(theme: Theme) {
  let resolvedTheme = theme === "system" ? resolveSystemTheme() : theme;
  if (resolvedTheme === "dark") return true;
  return false;
}
