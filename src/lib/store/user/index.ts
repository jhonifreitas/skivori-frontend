import { create } from "zustand";

import { IUserStore } from "./types";

export const useUserStore = create<IUserStore>((set) => ({
  coins: 20,
  setCoins: (coins) => set({ coins }),
}));
