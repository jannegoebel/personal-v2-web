import type { Theme } from "./theme-context";

export function resolveSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function isDarkTheme(theme: Theme) {
  if (theme === "dark") return true;
  if (theme === "system") {
    return;
  }
  return false;
}
