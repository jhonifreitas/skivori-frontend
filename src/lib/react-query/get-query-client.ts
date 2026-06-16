import { QueryClient, environmentManager } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Q5 — Keeps cached search results fresh for 1 minute before re-fetching.
        staleTime: 1000 * 60 * 1,
        retry: 1, // retry 1 time
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  const isServer = environmentManager.isServer();
  if (isServer) return makeQueryClient();

  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
