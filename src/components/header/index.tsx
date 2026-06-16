"use client";

import { Coins } from "lucide-react";

import { useDialogStore } from "@/lib/store/dialog";
import { useUserStore } from "@/lib/store/user";

import ExchangeDialog from "../exchange";
import { Button } from "../ui/button";

export default function Header() {
  const userStore = useUserStore();
  const { setIsOpen } = useDialogStore();

  function handleOpenExchangeDialog() {
    setIsOpen("exchange", true);
  }

  return (
    <div className="absolute inset-x-4 top-6 z-20 flex items-center justify-end sm:inset-x-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 py-1.5 pr-4 pl-2 shadow-[0_0_18px_rgba(255,197,74,0.25)] backdrop-blur">
          <span className="animate-coin-flip flex size-8 transform-3d items-center justify-center rounded-full bg-linear-to-b from-gold to-gold-deep shadow-[0_0_10px_rgba(255,197,74,0.6)]">
            <Coins className="size-4 text-[#2a1500]" />
          </span>
          <span className="text-base font-bold text-gold tabular-nums">
            {userStore.coins}
          </span>
        </div>

        <Button
          onClick={handleOpenExchangeDialog}
          disabled={userStore.coins <= 0}
          className="rounded-full border border-neon-pink/50 bg-linear-to-b from-neon-pink to-[#c41e7a] font-semibold text-white shadow-[0_0_16px_rgba(255,46,154,0.4)] transition-transform hover:scale-105 hover:from-[#ff4dad] hover:to-neon-pink active:scale-95"
        >
          Convert
        </Button>
      </div>

      <ExchangeDialog />
    </div>
  );
}
