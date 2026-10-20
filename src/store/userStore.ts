import { create } from "zustand";

const FREE_LIMIT = 5;

type Plan = "free" | "pro";
type BillingCycle = "monthly" | "yearly" | null;

interface UserState {
  plan: Plan;
  billingCycle: BillingCycle;
  usage: Record<string, number>;
  subscriptionEnd: number | null; // Unix timestamp (seconds)
  customerId: string | null;
  isPro: () => boolean;
  trackUsage: (toolId: string) => boolean;
  getRemaining: (toolId: string) => number;
  upgrade: (cycle?: BillingCycle) => void;
  setSubscription: (data: { customerId: string; currentPeriodEnd: number; cycle: BillingCycle }) => void;
  cancelSubscription: () => void;
  reset: () => void;
}

const loadUser = (): Pick<UserState, "plan" | "billingCycle" | "usage" | "subscriptionEnd" | "customerId"> => {
  try {
    return JSON.parse(
      localStorage.getItem("toolbox_user") ||
      '{"plan":"free","billingCycle":null,"usage":{},"subscriptionEnd":null,"customerId":null}'
    );
  } catch {
    return { plan: "free", billingCycle: null, usage: {}, subscriptionEnd: null, customerId: null };
  }
};

function saveUser(state: Pick<UserState, "plan" | "billingCycle" | "usage" | "subscriptionEnd" | "customerId">) {
  localStorage.setItem("toolbox_user", JSON.stringify(state));
}

export const useUserStore = create<UserState>((set, get) => ({
  ...loadUser(),
  isPro: () => {
    const state = get();
    if (state.plan !== "pro") return false;
    // Check subscription expiry
    if (state.subscriptionEnd && state.subscriptionEnd * 1000 < Date.now()) {
      // Subscription expired, downgrade
      const newState = { plan: "free" as Plan, billingCycle: null as BillingCycle, subscriptionEnd: null, customerId: null };
      set(newState);
      saveUser({ ...newState, usage: get().usage });
      return false;
    }
    return true;
  },
  trackUsage: (toolId: string) => {
    const state = get();
    if (state.isPro()) return true;
    const newUsage = { ...state.usage, [toolId]: (state.usage[toolId] || 0) + 1 };
    set({ usage: newUsage });
    saveUser({ plan: state.plan, billingCycle: state.billingCycle, usage: newUsage, subscriptionEnd: state.subscriptionEnd, customerId: state.customerId });
    return newUsage[toolId] <= FREE_LIMIT;
  },
  getRemaining: (toolId: string) => {
    const state = get();
    if (state.isPro()) return Infinity;
    return Math.max(0, FREE_LIMIT - (state.usage[toolId] || 0));
  },
  upgrade: (cycle: BillingCycle = "yearly") => {
    const state = get();
    const newState = {
      plan: "pro" as Plan,
      billingCycle: cycle,
      subscriptionEnd: state.subscriptionEnd || Math.floor(Date.now() / 1000) + 365 * 24 * 3600,
      customerId: state.customerId,
    };
    set(newState);
    saveUser({ ...newState, usage: state.usage });
  },
  setSubscription: (data) => {
    const state = get();
    const newState = {
      plan: "pro" as Plan,
      billingCycle: data.cycle,
      subscriptionEnd: data.currentPeriodEnd,
      customerId: data.customerId,
    };
    set(newState);
    saveUser({ ...newState, usage: state.usage });
  },
  cancelSubscription: () => {
    const state = get();
    const newState = {
      plan: "free" as Plan,
      billingCycle: null as BillingCycle,
      subscriptionEnd: null,
      customerId: null,
    };
    set(newState);
    saveUser({ ...newState, usage: state.usage });
  },
  reset: () => {
    set({ plan: "free", billingCycle: null, usage: {}, subscriptionEnd: null, customerId: null });
    localStorage.removeItem("toolbox_user");
  },
}));

export { FREE_LIMIT };
