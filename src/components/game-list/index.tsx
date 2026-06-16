"use client";

import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { getAllGame } from "@/lib/apis/game";
import { IGame } from "@/lib/apis/game/types";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Skeleton } from "../ui/skeleton";
import { TGameListProps } from "./types";

export default function GameList({ searchTerm }: TGameListProps) {
  const [search, setSearch] = useState(searchTerm ?? "");

  // Q5 — Only triggers a back-end search after 500ms without new keystrokes.
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    // Q5 — Caches results per search term to avoid redundant API calls.
    queryKey: ["games", debouncedSearch],
    queryFn: async () => {
      const data = await getAllGame(debouncedSearch);
      if ("error" in data) throw new Error(data.error.message);
      return data;
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGoToGame = (game: IGame) => {
    if (!game.startUrl) {
      toast.error("This game is not available yet");
      return;
    }

    window.open(game.startUrl, "_blank");
  };

  return (
    <div className="w-full">
      <div className="w-full space-y-3 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="from-gold to-neon-pink h-5 w-1 rounded-full bg-linear-to-b" />
          <h2 className="font-display text-foreground text-xl font-bold tracking-wide">
            Featured games
          </h2>
        </div>

        <InputGroup className="border-casino-purple/40 focus-within:border-gold/60 bg-black/30 backdrop-blur">
          <InputGroupAddon>
            <Search className="text-gold size-4" />
          </InputGroupAddon>

          <InputGroupInput
            type="search"
            placeholder="Search games..."
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      {error && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      )}

      {games?.length === 0 && !isLoading && !error && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">No games found!</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex w-max items-start gap-4 px-6 py-4">
          {isLoading
            ? [...Array(3)].map((_, index) => (
                <Skeleton
                  className="bg-casino-purple/15 h-60 w-42 shrink-0 rounded-xl sm:w-72"
                  key={index}
                />
              ))
            : games?.map((game) => (
                <Card
                  key={game.id}
                  className="group border-casino-purple/30 bg-casino-panel/60 hover:border-gold/60 w-72 shrink-0 cursor-pointer overflow-hidden p-0 pb-4 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_-5px_rgba(255,197,74,0.35)]"
                  onClick={() => handleGoToGame(game)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={game.thumb?.url ?? "/placeholder.png"}
                      alt={game.title}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="from-casino-panel absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
                    <span className="bg-gold/90 absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#2a1500] uppercase opacity-0 transition-opacity group-hover:opacity-100">
                      Play
                    </span>
                  </div>
                  <CardHeader className="px-4">
                    <CardTitle className="text-foreground group-hover:text-gold transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {game.providerName}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
