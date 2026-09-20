import { Logo } from "./Logo"
import { useCookieConsent } from "../hooks/useCookieConsent"
import { LinkedInIcon, InstagramIcon } from "./icons"

const LINKEDIN_URL = "https://www.linkedin.com/company/vektra-technologies-mz"
const INSTAGRAM_URL = "https://www.instagram.com/vektramz"

export function Footer() {
  const year = new Date().getFullYear()
  const { openPrompt } = useCookieConsent()

  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Logo />

        <div className="flex flex-col items-center gap-5 text-sm text-text-mute sm:flex-row sm:gap-7">
          <p>© {year} Vektra Technologies MZ</p>
          <button
            type="button"
            onClick={openPrompt}
            className="inline-flex min-h-11 items-center text-text-mute transition-colors duration-200 hover:text-text"
          >
            Preferências de cookies
          </button>
          <div className="flex items-center gap-1">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vektra Technologies MZ no LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-text-mute transition-colors duration-200 hover:bg-surface hover:text-text"
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vektra Technologies MZ no Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-text-mute transition-colors duration-200 hover:bg-surface hover:text-text"
            >
              <InstagramIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
