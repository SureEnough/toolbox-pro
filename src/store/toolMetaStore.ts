import { create } from "zustand";

interface ToolMetaState {
  favorites: string[];
  recent: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  addRecent: (toolId: string) => void;
  getRecent: () => string[];
}

const load = (): { favorites: string[]; recent: string[] } => {
  try {
    return JSON.parse(localStorage.getItem("toolbox_tool_meta") || '{"favorites":[],"recent":[]}');
  } catch {
    return { favorites: [], recent: [] };
  }
};

const save = (state: { favorites: string[]; recent: string[] }) => {
  localStorage.setItem("toolbox_tool_meta", JSON.stringify(state));
};

export const useToolMeta = create<ToolMetaState>((set, get) => ({
  ...load(),
  toggleFavorite: (toolId: string) => {
    const state = get();
    const favorites = state.favorites.includes(toolId)
      ? state.favorites.filter((f) => f !== toolId)
      : [...state.favorites, toolId];
    set({ favorites });
    save({ favorites, recent: state.recent });
  },
  isFavorite: (toolId: string) => get().favorites.includes(toolId),
  addRecent: (toolId: string) => {
    const state = get();
    const recent = [toolId, ...state.recent.filter((r) => r !== toolId)].slice(0, 6);
    set({ recent });
    save({ favorites: state.favorites, recent });
  },
  getRecent: () => get().recent,
}));
