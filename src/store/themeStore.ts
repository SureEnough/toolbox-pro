import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggle: () => void;
  set: (theme: "light" | "dark") => void;
}

const getInitial = (): "light" | "dark" => {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitial(),
  toggle: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    set({ theme: next });
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  },
  set: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  },
}));
