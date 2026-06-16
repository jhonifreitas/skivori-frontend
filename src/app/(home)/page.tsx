import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

import PageError from "@/components/error";
import GameList from "@/components/game-list";
import Header from "@/components/header";
import SlotMachine from "@/components/slot-machine";

import { getAllGame } from "@/lib/apis/game";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { TPageProps } from "@/lib/utils/page-props";

export default async function Home({ searchParams }: TPageProps) {
  const { search } = await searchParams;

  const games = await getAllGame(search);
  if ("error" in games) return <PageError error={games} />;

  const queryClient = getQueryClient();

  // Q5 — Pre-populates the React Query cache so the client skips a duplicate fetch on load.
  queryClient.setQueryData(["games", search ?? ""], games);

  return (
    <div className="casino-bg flex flex-1 flex-col items-center justify-center">
      {/* Ambient neon glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-ambient-pulse bg-casino-purple/30 absolute -top-32 -left-32 size-96 rounded-full blur-[120px]" />
        <div className="animate-ambient-pulse bg-neon-pink/25 absolute top-1/3 -right-32 size-96 rounded-full blur-[120px] [animation-delay:1.5s]" />
        <div className="animate-ambient-pulse bg-gold/20 absolute bottom-0 left-1/3 size-96 rounded-full blur-[120px] [animation-delay:3s]" />
      </div>

      <main className="border-casino-purple/30 relative z-10 flex w-full max-w-3xl flex-1 flex-col items-center gap-8 border-x bg-linear-to-b from-white/4 to-transparent py-20 backdrop-blur-sm">
        <Header />

        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <span className="animate-glow-pulse border-gold/40 bg-gold/10 text-gold inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="size-3.5" />
            Skivori Casino
          </span>

          <h1 className="font-display text-5xl leading-none font-black tracking-tight sm:text-7xl">
            <span className="animate-text-shimmer text-gradient-gold animate-neon-flicker drop-shadow-[0_0_25px_rgba(255,184,0,0.45)]">
              LUCKY SLOTS
            </span>
          </h1>

          <p className="text-muted-foreground max-w-md text-base sm:text-lg">
            Spin the 3 reels, line up the fruits and take the{" "}
            <span className="text-gold font-semibold">JACKPOT</span> home!
          </p>
        </div>

        <SlotMachine />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <GameList searchTerm={search} />
        </HydrationBoundary>
      </main>
    </div>
  );
}
