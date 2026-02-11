import { create } from "zustand";

interface MegaMenuState {
  activeMegaMenu: number | null;
  openActiveMegaMenu: (id: number | null) => void;
}

export const useMegaMenuStore = create<MegaMenuState>((set) => ({
  activeMegaMenu: null,
  openActiveMegaMenu: (id: number) =>
    set((menu) => ({
      activeMegaMenu: menu.activeMegaMenu !== id ? id : null,
    })),
}));
