"use client";

import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  tone: string;
  ratio?: string;
  rounded?: string;
  className?: string;
};

// Renders a remote blog image, falling back to a tonal gradient if the
// image is missing or fails to load (avoids broken-image / alt overflow).
export default function BlogImage({
  src,
  alt,
  tone,
  ratio = "16 / 9",
  rounded = "rounded-2xl",
  className = "",
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${tone} 0%, ${tone}99 60%, ${tone}55 100%)`,
          }}
        />
      )}
    </div>
  );
}
