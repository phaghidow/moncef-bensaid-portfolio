"use client";

import dynamic from "next/dynamic";

const EasterEggTerminal = dynamic(
  () => import("@/components/ui/easter-egg-terminal").then((mod) => mod.EasterEggTerminal),
  {
    ssr: false,
    loading: () => (
      <button type="button" className="text-left text-xs opacity-60 transition-opacity duration-fast hover:opacity-100">
        terminal
      </button>
    ),
  },
);

type EasterEggTerminalLoaderProps = {
  lines: string[];
  closeLabel: string;
  hint: string;
};

export function EasterEggTerminalLoader({ lines, closeLabel, hint }: EasterEggTerminalLoaderProps) {
  return <EasterEggTerminal lines={lines} closeLabel={closeLabel} hint={hint} />;
}
