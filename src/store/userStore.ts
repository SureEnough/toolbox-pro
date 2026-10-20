import { create } from "zustand";

const FREE_LIMIT = 5;

interface UserState {
  plan: "free" | "pro";
  usage: Record<string, number>;
  isPro: () => boolean;
  trackUsage: (toolId: string) => boolean;
  getRemaining: (toolId: string) => number;
  upgrade: () => void;
  reset: () => void;
}

const loadUser = (): { plan: "free" | "pro"; usage: Record<string, number> } => {
  try {
    return JSON.parse(localStorage.getItem("toolbox_user") || '{"plan":"free","usage":{}}');
  } catch {
    return { plan: "free", usage: {} };
  }
};

export const useUserStore = create<UserState>((set, get) => ({
  ...loadUser(),
  isPro: () => get().plan === "pro",
  trackUsage: (toolId: string) => {
    const state = get();
    if (state.plan === "pro") return true;
    const newUsage = { ...state.usage, [toolId]: (state.usage[toolId] || 0) + 1 };
    set({ usage: newUsage });
    localStorage.setItem("toolbox_user", JSON.stringify({ plan: state.plan, usage: newUsage }));
    return newUsage[toolId] <= FREE_LIMIT;
  },
  getRemaining: (toolId: string) => {
    const state = get();
    if (state.plan === "pro") return Infinity;
    return Math.max(0, FREE_LIMIT - (state.usage[toolId] || 0));
  },
  upgrade: () => {
    set({ plan: "pro" });
    const state = get();
    localStorage.setItem("toolbox_user", JSON.stringify({ plan: "pro", usage: state.usage }));
  },
  reset: () => {
    set({ plan: "free", usage: {} });
    localStorage.removeItem("toolbox_user");
  },
}));

export { FREE_LIMIT };
