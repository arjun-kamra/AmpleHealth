export default function Stars({
  rating = 5,
  className = "",
  size = 16,
}: {
  rating?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-amber"
            aria-hidden="true"
          >
            <path d="M12 17.3l-6.16 3.7 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.48 4.73 1.64 7.03z" />
          </svg>
        );
      })}
    </div>
  );
}
