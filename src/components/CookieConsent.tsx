import { useCookieConsent } from "../hooks/useCookieConsent"

export function CookieConsent() {
  const { promptOpen, status, accept, decline, closePrompt } = useCookieConsent()

  if (!promptOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl border-[3px] border-ink bg-paper p-5 shadow-brutal sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p className="text-sm text-ink/80">
        Usamos cookies só para perceber como o site é usado (Google Analytics), isto ajuda-nos
        a melhorar a experiência. Não usamos cookies de publicidade nem partilhamos dados com
        terceiros para marketing.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={accept}
          className="inline-flex items-center gap-2 border-[3px] border-ink bg-lime px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={decline}
          className="inline-flex items-center gap-2 border-[3px] border-ink bg-transparent px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink/5"
        >
          Recusar
        </button>

        {/* Only shown when reopened from the footer link to change an earlier choice. */}
        {status !== null && (
          <button
            type="button"
            onClick={closePrompt}
            className="ml-auto text-sm font-medium text-ink/50 underline underline-offset-2 hover:text-ink"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  )
}
