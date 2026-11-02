"use client";

import {
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

type HoverImageLinkProps = {
  slug: string;
  title?: string;
  preview?: string;
  label?: string;
  align?: "left" | "right";
  className?: string;
  previewClassName?: string;
  previewImageUnoptimized?: boolean;
  children: ReactNode;
};

const previewOffset = 18;

export function HoverImageLink({
  slug,
  preview,
  align = "left",
  className,
  previewClassName,
  previewImageUnoptimized = false,
  children,
}: HoverImageLinkProps) {
  const previewRef = useRef<HTMLSpanElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  function positionPreview(x: number, y: number) {
    if (!preview || !previewRef.current) return;

    const { width, height } = previewRef.current.getBoundingClientRect();
    const left = Math.min(
      Math.max(x + previewOffset, 12),
      window.innerWidth - width - 12,
    );
    const top = Math.min(
      Math.max(y + previewOffset, 12),
      window.innerHeight - height - 12,
    );

    previewRef.current.style.left = `${left}px`;
    previewRef.current.style.top = `${top}px`;
  }

  function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    positionPreview(event.clientX, event.clientY);
    setIsPreviewVisible(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "mouse") {
      positionPreview(event.clientX, event.clientY);
    }
  }

  function handleFocus(event: FocusEvent<HTMLAnchorElement>) {
    if (!preview) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    positionPreview(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    setIsPreviewVisible(true);
  }

  return (
    <Link
      href={{ pathname: "/projects/[slug]", params: { slug } }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsPreviewVisible(false)}
      onFocus={handleFocus}
      onBlur={() => setIsPreviewVisible(false)}
      className={className ?? `surface group relative flex items-center justify-between gap-4 p-4 transition-all duration-theme hover:border-accent hover:bg-accent-soft ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
      {preview && (
        <span
          ref={previewRef}
          aria-hidden="true"
          className={`pointer-events-none fixed z-[100] hidden aspect-video overflow-hidden rounded-xl border border-white/10 bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-sm transition-[opacity,transform] duration-200 md:block ${
            previewClassName ?? "w-[min(320px,calc(100vw-28px))]"
          } ${isPreviewVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {isPreviewVisible && (
            <Image
              src={preview}
              alt=""
              fill
              sizes={previewClassName ? "340px" : "320px"}
              className="object-cover"
              unoptimized={previewImageUnoptimized}
            />
          )}
        </span>
      )}
    </Link>
  );
}
