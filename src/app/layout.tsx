import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/class-merge";

import "./globals.css";
import Providers from "./providers";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Lucky Slots - Skivori Casino",
  description: "Spin the reels, hit the jackpot and win big!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        "font-sans",
        roboto.variable,
        poppins.variable,
      )}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
