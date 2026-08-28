type LogoProps = {
  /** Render on a dark background (navy) vs the light paper background. */
  variant?: "dark" | "light"
  showWordmark?: boolean
  className?: string
}

/**
 * Vektra "V" mark — a vector arrow fused into the letterform, matching the
 * approved brand icon (cyan → navy gradient chevron).
 */
export function Logo({ variant = "light", showWordmark = true, className = "" }: LogoProps) {
  const wordmarkColor = variant === "dark" ? "text-white" : "text-ink"
  const subColor = variant === "dark" ? "text-cyan-soft/80" : "text-ink/60"

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-grad" x1="6" y1="8" x2="58" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#33C7FF" />
            <stop offset="1" stopColor="#0B1A3A" />
          </linearGradient>
        </defs>
        <path d="M6 8L24 8L32 38L44 8L58 8L36 56L26 56L6 8Z" fill="url(#logo-grad)" />
      </svg>

      {showWordmark && (
        <span className="leading-none">
          <span className={`font-display text-xl font-bold tracking-tight ${wordmarkColor}`}>
            Vektra
          </span>
          <span className={`ml-1 block font-display text-[10px] font-semibold tracking-[0.25em] uppercase ${subColor}`}>
            Technologies MZ
          </span>
        </span>
      )}
    </div>
  )
}
