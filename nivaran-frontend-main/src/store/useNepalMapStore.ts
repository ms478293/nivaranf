import { SetStateAction } from "react";
import { create } from "zustand";

export interface IndexFiguresType {
  allFigures: boolean;
  popover: boolean;
  index: boolean;
  provinceList: boolean;
}

interface NepalMapStoreType {
  showIndexFigures: IndexFiguresType;
  setShowIndexFigures: (data: SetStateAction<IndexFiguresType>) => void;
}

export const useNepalMapStore = create<NepalMapStoreType>((set) => ({
  showIndexFigures: {
    allFigures: true,
    index: true,
    popover: true,
    provinceList: true,
  },
  setShowIndexFigures: (data) =>
    set((state) => ({
      showIndexFigures:
        typeof data === "function" ? data(state.showIndexFigures) : data,
    })),
}));
