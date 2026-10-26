"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type EasterEggTerminalProps = {
  lines: string[];
  closeLabel: string;
  hint: string;
};

export function EasterEggTerminal({ lines, closeLabel, hint }: EasterEggTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const sequence = useRef("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isOpenRef = useRef(false);

  const openTerminal = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
    isOpenRef.current = true;
    setIsOpen(true);
    setVisibleLines([]);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisibleLines(lines);
      return;
    }

    lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, index * 500);
      timers.current.push(timer);
    });
  }, [lines]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || (target instanceof HTMLElement && target.isContentEditable)) {
        return;
      }

      sequence.current = `${sequence.current}${event.key.toLowerCase()}`.slice(-3);
      if (sequence.current === "dev" && !isOpenRef.current) {
        openTerminal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current = [];
    };
  }, [openTerminal]);

  const closeTerminal = () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
    isOpenRef.current = false;
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openTerminal}
        className="text-left text-xs opacity-60 transition-opacity duration-fast hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {hint}
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-end bg-bg/30 p-6 backdrop-blur-[2px]" role="presentation">
          <section role="dialog" aria-modal="true" aria-label={hint} className="w-full max-w-md border border-border bg-surface p-5 font-mono text-sm text-text-secondary shadow-card">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3 text-text-muted">
              <span aria-hidden="true">./terminal</span>
              <button
                type="button"
                onClick={closeTerminal}
                aria-label={closeLabel}
                className="text-text-muted transition-colors duration-fast hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-40 space-y-2" aria-live="polite">
              {visibleLines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}