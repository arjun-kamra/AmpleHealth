import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  imageClassName = "h-10 w-auto sm:h-11",
  light = false,
  priority = false,
  onClick,
}: {
  className?: string;
  imageClassName?: string;
  light?: boolean;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AmpleHealth home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={light ? "/logo-white.png" : "/logo-cropped.png"}
        alt="AmpleHealth — Committed Care, Connected Care"
        width={1586}
        height={392}
        priority={priority}
        sizes="(max-width: 640px) 180px, 230px"
        className={imageClassName}
      />
    </Link>
  );
}
