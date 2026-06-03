"use client";

import Image from "next/image";
import { useState } from "react";
import Placeholder from "./Placeholder";

/**
 * Renders a real team photo from /public/team/{slug}.jpg.
 * Falls back gracefully to the tonal Placeholder if the image fails to load.
 */
export default function ProviderPhoto({
  slug,
  name,
  tone,
  ratio = "3 / 4",
  rounded = "rounded-2xl",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className = "",
}: {
  slug: string;
  name: string;
  tone: string;
  ratio?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const monogram = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (errored) {
    return (
      <Placeholder
        tone={tone}
        ratio={ratio}
        monogram={monogram}
        label={name}
        rounded={rounded}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={`/team/${slug}.jpg`}
        alt={name}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

/**
 * Tiny circular avatar used in the "Also on our team" chip strip.
 * Falls back to colored initials square.
 */
export function ProviderAvatar({
  slug,
  name,
  tone,
  size = 28,
}: {
  slug: string;
  name: string;
  tone: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);
  const monogram = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (errored) {
    return (
      <span
        className="grid flex-none place-items-center rounded-lg font-serif text-xs font-semibold text-white"
        style={{ backgroundColor: tone, width: size, height: size }}
      >
        {monogram}
      </span>
    );
  }

  return (
    <span
      className="relative flex-none overflow-hidden rounded-lg"
      style={{ width: size, height: size }}
    >
      <Image
        src={`/team/${slug}.jpg`}
        alt={name}
        fill
        sizes={`${size * 2}px`}
        className="object-cover object-top"
        onError={() => setErrored(true)}
      />
    </span>
  );
}
