import logoMark from "../assets/vektra-logo.png"

type LogoProps = {
  /** Render on a dark background (navy) vs the light paper background. */
  variant?: "dark" | "light"
  showWordmark?: boolean
  className?: string
}

/** Vektra "V" mark — the approved brand icon (cyan → navy gradient chevron). */
export function Logo({ variant = "light", showWordmark = true, className = "" }: LogoProps) {
  const wordmarkColor = variant === "dark" ? "text-white" : "text-ink"
  const subColor = variant === "dark" ? "text-cyan-soft/80" : "text-ink/60"

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoMark} alt="" aria-hidden="true" className="h-9 w-auto shrink-0" />

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
