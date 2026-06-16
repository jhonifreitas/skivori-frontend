import { cn } from "@/lib/utils/class-merge";

import { IFruitSymbol } from "./types";

interface IReelProps {
  symbol: IFruitSymbol;
  spinning: boolean;
}

export default function Reel({ symbol, spinning }: IReelProps) {
  return (
    <div className="relative flex h-28 w-24 items-center justify-center overflow-hidden rounded-xl border border-gold/40 bg-linear-to-b from-[#fffdf7] to-[#f3e9c8] shadow-[inset_0_2px_10px_rgba(0,0,0,0.35)] sm:h-32 sm:w-28">
      {/* Glass shine overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/50 via-transparent to-black/10" />
      {/* Top & bottom fade to mimic depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-linear-to-b from-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-black/25 to-transparent" />

      <span
        role="img"
        aria-label={symbol.label}
        className={cn(
          "relative text-6xl drop-shadow-sm transition-transform sm:text-7xl",
          spinning && "animate-spin-reel blur-[1.5px]",
        )}
      >
        {symbol.emoji}
      </span>
    </div>
  );
}
