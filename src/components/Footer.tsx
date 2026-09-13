import { Logo } from "./Logo"
import { useCookieConsent } from "../hooks/useCookieConsent"
import { LinkedInIcon, InstagramIcon } from "./icons"

const LINKEDIN_URL = "https://www.linkedin.com/company/vektra-technologies-mz"
const INSTAGRAM_URL = "https://www.instagram.com/vektramz"

export function Footer() {
  const year = new Date().getFullYear()
  const { openPrompt } = useCookieConsent()

  return (
    <footer className="border-t-[3px] border-ink bg-navy-deep py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Logo variant="dark" />
        <div className="flex flex-col items-center gap-4 text-sm text-white/50 sm:flex-row">
          <p>© {year} Vektra Technologies MZ. Todos os direitos reservados.</p>
          <button
            type="button"
            onClick={openPrompt}
            className="underline underline-offset-2 hover:text-white"
          >
            Preferências de cookies
          </button>
          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vektra Technologies MZ no LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center border-[3px] border-white/20 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vektra Technologies MZ no Instagram"
              className="inline-flex h-9 w-9 items-center justify-center border-[3px] border-white/20 text-white/70 transition-colors hover:border-cyan hover:text-cyan"
            >
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
