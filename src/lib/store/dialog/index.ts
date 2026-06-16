import { create } from "zustand";

import { TDialogStore } from "./types";

export const useDialogStore = create<TDialogStore>((set) => ({
  isOpen: {},
  setIsOpen: (name, open) =>
    set((state) => ({ isOpen: { ...state.isOpen, [name]: open } })),
  closeAll: () => set({ isOpen: {} }),
}));
