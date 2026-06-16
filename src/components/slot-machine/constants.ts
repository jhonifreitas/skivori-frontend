import { TFruit } from "@/lib/apis/game/types";

import { IFruitSymbol } from "./types";

export const FRUITS: Record<TFruit, IFruitSymbol> = {
  [TFruit.CHERRY]: { value: TFruit.CHERRY, emoji: "🍒", label: "Cherry" },
  [TFruit.LEMON]: { value: TFruit.LEMON, emoji: "🍋", label: "Lemon" },
  [TFruit.APPLE]: { value: TFruit.APPLE, emoji: "🍎", label: "Apple" },
  [TFruit.BANANA]: { value: TFruit.BANANA, emoji: "🍌", label: "Banana" },
};

export const FRUIT_VALUES = Object.values(TFruit);

export const REELS_COUNT = 3;
export const SPIN_DURATION_MS = 1000;
export const SPIN_STAGGER_MS = 250;
