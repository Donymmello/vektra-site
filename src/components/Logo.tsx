import logoMark from "../assets/vektra-logo.png"

type LogoProps = {
  showWordmark?: boolean
  className?: string
}

/** Vektra "V" mark: the approved brand icon (cyan to navy gradient chevron). */
export function Logo({ showWordmark = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Intrinsic size of the PNG (295x240), so the browser reserves the right
          aspect ratio and the row doesn't reflow once it lands. The rendered
          size still comes from `h-8 w-auto` below. */}
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        width={295}
        height={240}
        className="h-8 w-auto shrink-0"
      />

      {showWordmark && (
        <span className="text-title text-[17px] font-semibold text-text">Vektra</span>
      )}
    </div>
  )
}
