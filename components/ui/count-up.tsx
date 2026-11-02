"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

type ParsedValue = {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  if (!match || match.index === undefined) return null;

  const numberText = match[1];
  return {
    prefix: value.slice(0, match.index),
    number: Number(numberText),
    suffix: value.slice(match.index + numberText.length),
    decimals: numberText.includes(".") ? numberText.split(".")[1].length : 0,
  };
}

export function CountUp({ value, className }: CountUpProps) {
  const parsed = parseValue(value);
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    parsed ? (0).toFixed(parsed.decimals) : value,
  );
  const visibleValue =
    reducedMotion && parsed
      ? parsed.number.toFixed(parsed.decimals)
      : displayValue;

  useEffect(() => {
    const target = parseValue(value);
    if (!target || reducedMotion) return;

    const start = performance.now();
    const duration = 800;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue((target.number * eased).toFixed(target.decimals));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, value]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {parsed.prefix}{visibleValue}{parsed.suffix}
    </span>
  );
}
