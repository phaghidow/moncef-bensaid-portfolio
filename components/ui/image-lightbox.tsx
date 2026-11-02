"use client";

import { ArrowLeft, ArrowRight, ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectGalleryGroup } from "@/lib/projects";

export type GalleryGroup = ProjectGalleryGroup;

type ImageLightboxProps = {
  groups: GalleryGroup[];
  openLabel: string;
  closeLabel: string;
  dialogLabel: string;
  previousLabel: string;
  nextLabel: string;
  moreLabel: string;
  countLabel: string;
  swipeHint: string;
  upcomingLabel: string;
};

export function ImageLightbox({
  groups,
  openLabel,
  closeLabel,
  dialogLabel,
  previousLabel,
  nextLabel,
  moreLabel,
  countLabel,
  swipeHint,
  upcomingLabel,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [activeLocation, setActiveLocation] = useState<{
    groupIndex: number;
    imageIndex: number;
  } | null>(null);

  const activeGroup = activeLocation
    ? groups[activeLocation.groupIndex]
    : null;
  const activeImage = activeLocation
    ? activeGroup?.images[activeLocation.imageIndex]
    : null;

  function openImage(groupIndex: number, imageIndex: number) {
    setActiveLocation({ groupIndex, imageIndex });
    dialogRef.current?.showModal();
  }

  function closeImage() {
    dialogRef.current?.close();
    setActiveLocation(null);
    pointerStart.current = null;
  }

  function moveImage(direction: -1 | 1) {
    setActiveLocation((current) => {
      if (!current) return current;
      const count = groups[current.groupIndex].images.length;
      return {
        ...current,
        imageIndex: (current.imageIndex + direction + count) % count,
      };
    });
  }

  return (
    <>
      <div className="space-y-10">
        {groups.map((group, groupIndex) => {
          const featuredImages =
            group.mobileMockup || group.images.length <= 3
              ? group.images
              : group.images.slice(0, 3);
          const hiddenCount =
            !group.mobileMockup && group.images.length > 3
              ? group.images.length - 3
              : 0;
          const visibleImages =
            hiddenCount > 0 ? featuredImages.slice(0, 2) : featuredImages;
          const overflowImage = group.images[2];
          const itemCount = group.images.length + (group.upcoming?.length ?? 0);

          return (
            <section
              key={group.id}
              aria-labelledby={`gallery-group-${group.id}`}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <div className="space-y-1">
                  <h3
                    id={`gallery-group-${group.id}`}
                    className="font-display text-xl text-text-primary md:text-2xl"
                  >
                    {group.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                    {group.description}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {String(itemCount).padStart(2, "0")}{" "}
                  {group.images.length > 0 ? countLabel : upcomingLabel}
                </span>
              </div>

              {group.upcoming && group.images.length === 0 ? (
                <div
                  className={
                    group.mobileMockup || group.centered
                      ? "flex flex-wrap justify-center gap-4"
                      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {group.upcoming.map((title) => (
                    <div
                      key={title}
                      className={`surface flex aspect-video flex-col items-center justify-center gap-3 border-dashed bg-code-bg/40 px-4 text-center ${
                        group.centered
                          ? "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                          : ""
                      }`}
                    >
                      <ImagePlus
                        className="size-5 text-text-muted"
                        aria-hidden="true"
                      />
                      <p className="font-mono text-sm text-text-secondary">
                        {title}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        {upcomingLabel}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={
                    group.mobileMockup
                      ? "flex flex-wrap justify-center gap-5"
                      : group.centered
                      ? "flex flex-wrap justify-center gap-4"
                      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {visibleImages.map((image, imageIndex) => (
                    <figure
                      key={image.src}
                      className={
                        group.mobileMockup
                          ? "group w-[calc((100%-1.25rem)/2)] sm:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)] xl:max-w-64"
                          : `surface group overflow-hidden ${
                              group.centered
                                ? "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                                : ""
                            }`
                      }
                    >
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`${openLabel}: ${image.title}`}
                        onClick={() => openImage(groupIndex, imageIndex)}
                        className={
                          group.mobileMockup
                            ? "relative mx-auto block aspect-[9/19.5] w-full overflow-hidden rounded-[2.5rem] border-4 border-neutral-800 bg-neutral-800 p-1 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)] transition-transform duration-theme hover:-translate-y-1"
                            : "relative block aspect-video w-full overflow-hidden bg-code-bg"
                        }
                      >
                        {group.mobileMockup ? (
                          <>
                            <span className="absolute inset-[5px] overflow-hidden rounded-[2rem] bg-white">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 22vw"
                                className="object-cover"
                              />
                            </span>
                            <span
                              aria-hidden="true"
                              className="absolute left-1/2 top-0 z-10 flex h-1 w-8 -translate-x-1/2 items-center justify-end rounded-full bg-neutral-700 px-1"
                            >
                              <span className="size-1 rounded-full bg-neutral-950" />
                            </span>
                          </>
                        ) : (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-contain transition-transform duration-theme group-hover:scale-[1.02]"
                          />
                        )}
                      </button>
                      <figcaption
                        className={`px-2 py-3 text-center font-mono text-xs text-text-secondary ${
                          group.mobileMockup
                            ? ""
                            : "border-t border-border px-4"
                        }`}
                      >
                        {image.title}
                      </figcaption>
                    </figure>
                  ))}

                  {hiddenCount > 0 && overflowImage && (
                    <figure
                      className={`surface group overflow-hidden ${
                        group.centered
                          ? "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`+${hiddenCount} ${moreLabel}`}
                        onClick={() => openImage(groupIndex, 2)}
                        className="relative block aspect-video w-full overflow-hidden bg-code-bg"
                      >
                        <Image
                          src={overflowImage.src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain opacity-55 transition-transform duration-theme group-hover:scale-[1.02]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/45 font-mono text-2xl font-medium text-white transition-colors group-hover:bg-black/55">
                          +{hiddenCount}
                          <span className="ml-2 text-sm font-normal">
                            {moreLabel}
                          </span>
                        </span>
                      </button>
                      <figcaption className="border-t border-border px-4 py-3 font-mono text-xs text-text-secondary">
                        +{hiddenCount} {moreLabel}
                      </figcaption>
                    </figure>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={
          activeImage
            ? `${dialogLabel}: ${activeImage.title}`
            : dialogLabel
        }
        onClose={() => setActiveLocation(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeImage();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeImage();
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveImage(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            moveImage(1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeImage();
          }
        }}
        className="fixed m-auto max-h-[94dvh] w-[min(96vw,90rem)] max-w-none overflow-hidden rounded-xl border border-border bg-surface p-0 text-text-primary shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {activeImage && activeGroup && activeLocation && (
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {activeGroup.title}
                </p>
                <p className="mt-1 truncate font-mono text-sm text-text-primary">
                  {activeImage.title}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  aria-live="polite"
                  className="font-mono text-xs tabular-nums text-text-muted"
                >
                  {String(activeLocation.imageIndex + 1).padStart(2, "0")} /{" "}
                  {String(activeGroup.images.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={closeImage}
                  className="flex size-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-accent-soft hover:text-accent focus-visible:text-accent"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              onPointerDown={(event) => {
                if (event.pointerType === "touch") {
                  pointerStart.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                }
              }}
              onPointerUp={(event) => {
                const start = pointerStart.current;
                pointerStart.current = null;
                if (!start || event.pointerType !== "touch") return;

                const deltaX = event.clientX - start.x;
                const deltaY = event.clientY - start.y;
                if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  moveImage(deltaX < 0 ? 1 : -1);
                }
              }}
              onPointerCancel={() => {
                pointerStart.current = null;
              }}
              className={`relative flex h-[min(70dvh,52rem)] min-h-56 items-center justify-center [touch-action:pan-y] ${
                activeGroup.mobileMockup ? "bg-code-bg" : "bg-black"
              }`}
            >
              {activeGroup.mobileMockup ? (
                <div className="relative h-[min(70dvh,52rem)] w-auto aspect-[9/19.5] max-w-[82vw] overflow-hidden rounded-[2.5rem] border-4 border-neutral-800 bg-neutral-800 p-1">
                  <span className="absolute inset-[5px] overflow-hidden rounded-[2rem] bg-white">
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      sizes="(max-width: 640px) 80vw, 24rem"
                      className="pointer-events-none object-cover"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 z-10 flex h-1 w-8 -translate-x-1/2 items-center justify-end rounded-full bg-neutral-700 px-1"
                  >
                    <span className="size-1 rounded-full bg-neutral-950" />
                  </span>
                </div>
              ) : (
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="96vw"
                  className="pointer-events-none object-contain"
                />
              )}
              <button
                type="button"
                aria-label={previousLabel}
                onClick={() => moveImage(-1)}
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:left-5"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={nextLabel}
                onClick={() => moveImage(1)}
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:right-5"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => moveImage(-1)}
                className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{previousLabel}</span>
              </button>
              <p className="text-center font-mono text-[10px] text-text-muted sm:text-xs">
                {swipeHint}
              </p>
              <button
                type="button"
                onClick={() => moveImage(1)}
                className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-accent"
              >
                <span className="hidden sm:inline">{nextLabel}</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
