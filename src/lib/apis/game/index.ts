import { getApi, postApi } from "../_base";
import { TApiOption } from "../_base/types";
import {
  IExchangeCurrency,
  IGame,
  IGameSpin,
  TExchangeCurrency,
  TGameSpin,
} from "./types";

const tags = ["game"];
const options: TApiOption = { tags };

export function getAllGame(search?: string) {
  const query = { search };
  return getApi<IGame[]>(`games`, { ...options, query });
}

export function getGameById(id: string) {
  return getApi<IGame>(`games/${id}`, options);
}

export function spinGame(data: TGameSpin) {
  return postApi<IGameSpin>(`games/spin`, data, options);
}

export function exchangeCurrency(query: TExchangeCurrency) {
  return getApi<IExchangeCurrency[]>(`games/exchange-currency`, {
    ...options,
    query,
  });
}
