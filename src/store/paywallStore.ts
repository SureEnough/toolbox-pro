import { create } from "zustand";

interface PaywallState {
  open: boolean;
  show: () => void;
  hide: () => void;
}

export const usePaywallStore = create<PaywallState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
