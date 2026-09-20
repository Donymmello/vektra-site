import { useCookieConsent } from "../hooks/useCookieConsent"

export function CookieConsent() {
  const { promptOpen, status, accept, decline, closePrompt } = useCookieConsent()

  if (!promptOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-card border border-line-2 bg-surface/95 p-5 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p className="text-sm leading-relaxed text-text-dim">
        Usamos cookies só para perceber como o site é usado (Google Analytics), isto ajuda-nos
        a melhorar a experiência. Não usamos cookies de publicidade nem partilhamos dados com
        terceiros para marketing.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={accept}
          className="inline-flex min-h-11 items-center rounded-control bg-text px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={decline}
          className="inline-flex min-h-11 items-center rounded-control border border-line-2 px-5 py-2.5 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface-2"
        >
          Recusar
        </button>

        {/* Only shown when reopened from the footer link to change an earlier choice. */}
        {status !== null && (
          <button
            type="button"
            onClick={closePrompt}
            className="ml-auto inline-flex min-h-11 items-center text-sm text-text-mute transition-colors duration-200 hover:text-text"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  )
}
