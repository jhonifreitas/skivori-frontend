export interface IGame {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  startUrl?: string;
  thumb?: IGameThumb | null;
}

interface IGameThumb {
  url: string;
}

export type TGameSpin = {
  balance: number;
};

export interface IGameSpin {
  reels: [TFruit, TFruit, TFruit];
  win: number;
  cost: number;
  coins: number;
}

export type TExchangeCurrency = {
  currency: string;
  amount: number;
};

export interface IExchangeCurrency {
  currency: string;
  amount: number;
}

export enum TFruit {
  CHERRY = "cherry",
  LEMON = "lemon",
  APPLE = "apple",
  BANANA = "banana",
}
