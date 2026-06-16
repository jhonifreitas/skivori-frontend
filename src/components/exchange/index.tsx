"use client";

import { useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";

import { exchangeCurrency } from "@/lib/apis/game";
import { useDialogStore } from "@/lib/store/dialog";
import { useUserStore } from "@/lib/store/user";
import { formatCurrency } from "@/lib/utils/format";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const DIALOG_NAME = "exchange";

export default function ExchangeDialog() {
  const userStore = useUserStore();
  const { isOpen, setIsOpen } = useDialogStore();

  const {
    data: currencyList,
    isLoading,
    error,
  } = useQuery({
    enabled: !!isOpen[DIALOG_NAME],
    queryKey: ["currencyList", userStore.coins],
    queryFn: async ({ queryKey }) => {
      const amount = queryKey[1] as number;
      const data = await exchangeCurrency({
        currency: "EUR",
        amount,
      });
      if ("error" in data) throw new Error(data.error.message);
      return data;
    },
  });

  return (
    <Dialog
      open={!!isOpen[DIALOG_NAME]}
      onOpenChange={(open) => setIsOpen(DIALOG_NAME, open)}
    >
      <DialogContent
        showCloseButton={false}
        className="border-gold/40 bg-linear-to-b from-[#1f0f44] to-[#120630] shadow-[0_0_40px_rgba(255,197,74,0.25)]"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-black text-gradient-gold">
            Currency Conversion
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            List of available currencies and their exchange rates.
          </DialogDescription>

          <Separator className="bg-linear-to-r from-gold via-neon-pink to-casino-purple" />
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl border border-gold/30 bg-black/30 p-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-b from-gold to-gold-deep shadow-[0_0_10px_rgba(255,197,74,0.6)]">
              <Coins className="size-5 text-[#2a1500]" />
            </span>
            <p className="text-base font-bold text-gold">
              {userStore.coins} coins
            </p>
          </div>

          <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-casino-purple/30">
            <table className="w-full">
              <thead>
                <tr className="sticky top-0 bg-casino-panel text-left text-xs font-semibold tracking-wider text-gold uppercase">
                  <th className="p-3">Currency</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currencyList?.map((currency) => (
                  <tr
                    key={currency.currency}
                    className="border-t border-casino-purple/15 transition-colors even:bg-white/3 hover:bg-gold/5"
                  >
                    <td className="p-3 font-medium">{currency.currency}</td>
                    <td className="p-3 text-muted-foreground">
                      {formatCurrency(currency.amount, currency.currency)}
                    </td>
                  </tr>
                ))}

                {isLoading &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-t border-casino-purple/15"
                    >
                      <td className="p-3">
                        <Skeleton className="h-4 w-16 bg-casino-purple/20" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-16 bg-casino-purple/20" />
                      </td>
                    </tr>
                  ))}

                {currencyList?.length === 0 && !isLoading && !error && (
                  <tr>
                    <td
                      colSpan={2}
                      className="p-3 text-center text-muted-foreground"
                    >
                      No currencies found!
                    </td>
                  </tr>
                )}

                {error && (
                  <tr>
                    <td
                      colSpan={2}
                      className="p-3 text-center text-muted-foreground"
                    >
                      {error.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
