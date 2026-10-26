"use client";

import { useMotionValue, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(parsed?.number.toFixed(parsed.decimals) ?? value);

  useEffect(() => {
    const target = parseValue(value);
    if (!target || !isInView || reducedMotion) return;

    const start = performance.now();
    const duration = 800;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      motionValue.set(target.number * eased);
      setDisplayValue(motionValue.get().toFixed(target.decimals));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, motionValue, reducedMotion, value]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}{displayValue}{parsed.suffix}
    </span>
  );
}
