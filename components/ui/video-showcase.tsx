"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProjectVideo } from "@/lib/projects";

type VideoShowcaseProps = {
  videos: ProjectVideo[];
  playLabel: string;
};

function VideoCard({
  video,
  playLabel,
}: {
  video: ProjectVideo;
  playLabel: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <figure className="surface flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden bg-code-bg">
        {isPlaying ? (
          <video
            controls
            autoPlay
            playsInline
            preload="none"
            poster={video.poster}
            aria-label={video.title}
            className="h-full w-full bg-black"
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`${playLabel}: ${video.title}`}
            className="group absolute inset-0 flex h-full w-full items-end text-left text-white focus-visible:outline-offset-[-4px]"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10"
            />
            {video.duration && (
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                {video.duration}
              </span>
            )}
            <span className="relative z-10 max-w-[80%] p-5 sm:p-7">
              <span className="block max-w-3xl font-display text-lg leading-tight text-white sm:text-xl md:text-2xl">
                {video.hook}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-full border border-white/30 bg-white text-text-primary shadow-xl transition-transform duration-300 group-hover:scale-110 sm:bottom-7 sm:right-7 sm:size-14"
            >
              <Play className="ml-0.5 size-5 fill-current" />
            </span>
            <span className="absolute right-5 top-5 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:right-7 sm:top-7">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex-1 px-4 py-4 sm:px-5">
        <p className="font-mono text-sm text-text-primary">{video.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
          {video.description}
        </p>
      </figcaption>
    </figure>
  );
}

export function VideoShowcase({ videos, playLabel }: VideoShowcaseProps) {
  if (videos.length === 1) {
    return (
      <div className="mx-auto w-full sm:w-1/2">
        <VideoCard video={videos[0]} playLabel={playLabel} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard
          key={video.src}
          video={video}
          playLabel={playLabel}
        />
      ))}
    </div>
  );
}
