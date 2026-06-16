import { Sparkles } from "lucide-react";

export default function HomeLoading() {
  return (
    <div className="casino-bg flex flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Ambient neon glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-ambient-pulse bg-casino-purple/30 absolute -top-32 -left-32 size-96 rounded-full blur-[120px]" />
        <div className="animate-ambient-pulse bg-neon-pink/25 absolute top-1/3 -right-32 size-96 rounded-full blur-[120px] [animation-delay:1.5s]" />
        <div className="animate-ambient-pulse bg-gold/20 absolute bottom-0 left-1/3 size-96 rounded-full blur-[120px] [animation-delay:3s]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <span className="animate-glow-pulse border-gold/40 bg-gold/10 text-gold inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="size-3.5" />
          Skivori Casino
        </span>

        {/* Spinning reels placeholder */}
        <div className="relative">
          <div className="animate-glow-pulse from-gold/40 via-neon-pink/20 to-casino-purple/30 absolute -inset-2 rounded-[2rem] bg-linear-to-b blur-lg" />

          <div className="border-gold/70 relative rounded-[1.75rem] border-2 bg-linear-to-b from-[#2a1356] to-[#150733] p-1.5 shadow-[inset_0_2px_8px_rgba(255,213,74,0.2)]">
            <div className="border-gold/30 rounded-2xl border bg-black/60 p-3 shadow-inner sm:p-4">
              <div className="flex justify-center gap-2 sm:gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-gold/40 flex h-28 w-24 items-center justify-center overflow-hidden rounded-xl border bg-linear-to-b from-[#fffdf7] to-[#f3e9c8] shadow-[inset_0_2px_10px_rgba(0,0,0,0.35)] sm:h-32 sm:w-28"
                  >
                    <span className="animate-spin-reel text-6xl blur-[1.5px] sm:text-7xl">
                      🍀
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="animate-neon-flicker font-display text-gold text-lg font-bold tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
