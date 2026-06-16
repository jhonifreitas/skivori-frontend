"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { spinGame } from "@/lib/apis/game";
import { TFruit } from "@/lib/apis/game/types";
import { useUserStore } from "@/lib/store/user";
import { cn } from "@/lib/utils/class-merge";
import { fireConfetti } from "@/lib/utils/fire-confetti";
import { randomFruit } from "@/lib/utils/random-fruit";

import {
  FRUITS,
  REELS_COUNT,
  SPIN_DURATION_MS,
  SPIN_STAGGER_MS,
} from "./constants";
import Reel from "./reel";

export default function SlotMachine() {
  const userStore = useUserStore();

  const [reels, setReels] = useState<TFruit[]>(() =>
    Array.from({ length: REELS_COUNT }, () => TFruit.APPLE),
  );
  const [spinning, setSpinning] = useState<boolean[]>(() =>
    Array.from({ length: REELS_COUNT }, () => false),
  );

  const [result, setResult] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const isSpinning = spinning.some(Boolean);

  function stopIntervals() {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }

  function stopTimeouts() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  async function spin() {
    if (isSpinning) return;

    setResult(null);
    setWon(false);
    setSpinning(Array.from({ length: REELS_COUNT }, () => true));

    intervalsRef.current = Array.from({ length: REELS_COUNT }, (_, reelIndex) =>
      setInterval(() => {
        setReels((current) => {
          const next = [...current];
          next[reelIndex] = randomFruit();
          return next;
        });
      }, 80),
    );

    const startedAt = Date.now();
    const response = await spinGame({ balance: userStore.coins });

    if ("error" in response) {
      stopIntervals();
      setSpinning(Array.from({ length: REELS_COUNT }, () => false));
      setResult(response.error?.message || "Something went wrong. Try again.");
      return;
    }

    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, SPIN_DURATION_MS - elapsed);

    response.reels.forEach((fruit, reelIndex) => {
      const isLastReel = reelIndex === REELS_COUNT - 1;

      const timeout = setTimeout(
        () => {
          clearInterval(intervalsRef.current[reelIndex]);

          setReels((current) => {
            const next = [...current];
            next[reelIndex] = fruit;
            return next;
          });

          setSpinning((current) => {
            const next = [...current];
            next[reelIndex] = false;
            return next;
          });

          if (isLastReel) {
            if (response.win > 0) {
              setResult(`You won ${response.win} coins! 🎉`);
              setWon(true);
              fireConfetti();
            } else {
              setResult("No luck this time. Try again!");
            }

            userStore.setCoins(response.coins);
          }
        },
        remaining + reelIndex * SPIN_STAGGER_MS,
      );

      timeoutsRef.current.push(timeout);
    });
  }

  useEffect(() => {
    return () => {
      stopIntervals();
      stopTimeouts();
    };
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-8 px-4">
      {/* Slot cabinet */}
      <div className="relative w-full max-w-md">
        {/* Glow behind the cabinet */}
        <div className="animate-glow-pulse from-gold/40 via-neon-pink/20 to-casino-purple/30 absolute -inset-2 rounded-[2rem] bg-linear-to-b blur-lg" />

        <div className="border-gold/70 relative rounded-[1.75rem] border-2 bg-linear-to-b from-[#2a1356] to-[#150733] p-1.5 shadow-[inset_0_2px_8px_rgba(255,213,74,0.2)]">
          {/* Marquee lights top */}
          <div className="flex justify-center gap-2 py-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="bg-gold size-2 rounded-full shadow-[0_0_8px_2px_rgba(255,197,74,0.8)]"
                style={{
                  animation: "neon-flicker 2s infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Reels window */}
          <div className="border-gold/30 rounded-2xl border bg-black/60 p-3 shadow-inner sm:p-4">
            <div
              className={cn(
                "flex justify-center gap-2 sm:gap-3",
                won && "animate-win-shake",
              )}
            >
              {reels.map((fruit, reelIndex) => (
                <Reel
                  key={reelIndex}
                  symbol={FRUITS[fruit]}
                  spinning={spinning[reelIndex]}
                />
              ))}
            </div>
          </div>

          {/* Payline hint */}
          <div className="text-gold/70 flex items-center justify-center gap-2 py-2 text-[10px] font-semibold tracking-widest uppercase">
            <span className="to-gold/60 h-px w-8 bg-linear-to-r from-transparent" />
            Payline
            <span className="to-gold/60 h-px w-8 bg-linear-to-l from-transparent" />
          </div>
        </div>
      </div>

      {/* Spin button */}
      <Button
        size="lg"
        onClick={spin}
        disabled={isSpinning || userStore.coins <= 0}
        className={cn(
          "border-gold/60 from-gold to-gold-deep hover:to-gold h-14 min-w-44 rounded-full border-2 bg-linear-to-b px-12 text-base font-black tracking-widest text-[#2a1500] uppercase shadow-[0_8px_24px_rgba(255,184,0,0.4)] transition-transform hover:scale-105 hover:from-[#ffe27a] active:scale-95 disabled:hover:scale-100",
          !isSpinning && userStore.coins > 0 && "animate-glow-pulse",
        )}
      >
        {isSpinning
          ? "Spinning..."
          : userStore.coins <= 0
            ? "No coins"
            : "Spin"}
      </Button>

      {/* Result banner */}
      <div className="flex min-h-12 items-center justify-center">
        {result && (
          <p
            className={cn(
              "animate-pop-in rounded-full px-6 py-2 text-center text-lg font-bold",
              won
                ? "text-gradient-gold animate-text-shimmer text-2xl drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]"
                : "text-muted-foreground",
            )}
          >
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
