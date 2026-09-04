import { Logo } from "./Logo"
import { useCookieConsent } from "../hooks/useCookieConsent"

export function Footer() {
  const year = new Date().getFullYear()
  const { openPrompt } = useCookieConsent()

  return (
    <footer className="border-t-[3px] border-ink bg-navy-deep py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Logo variant="dark" />
        <div className="flex flex-col items-center gap-2 text-sm text-white/50 sm:flex-row sm:gap-4">
          <p>© {year} Vektra Technologies MZ. Todos os direitos reservados.</p>
          <button
            type="button"
            onClick={openPrompt}
            className="underline underline-offset-2 hover:text-white"
          >
            Preferências de cookies
          </button>
        </div>
      </div>
    </footer>
  )
}
