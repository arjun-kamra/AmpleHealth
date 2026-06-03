import Link from "next/link";

export default function Logo({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="AmpleHealth home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-brand text-white shadow-[0_8px_20px_-10px_rgba(27,117,187,0.9)]">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* abstract pulse + cross mark */}
          <path d="M2 12h4l2-5 3 10 2-7 2 4h6" />
        </svg>
      </span>
      <span className="font-serif text-xl font-semibold leading-none tracking-tight">
        Ample<span className="text-brand">Health</span>
      </span>
    </Link>
  );
}
