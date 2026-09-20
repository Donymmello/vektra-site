import { Suspense, lazy } from "react"
import { ArrowRightIcon } from "./icons"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

// Still code-split, even though HeroScene is now plain Canvas2D (no three.js):
// the network field is decorative, so it can wait until after the page's
// actual text and layout are ready instead of sharing the initial bundle.
const HeroScene = lazy(() => import("./HeroScene"))

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      <div className="ambient-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene interactive={!reducedMotion} />
        </Suspense>
      </div>

      {/* Fades the decorative field out behind the copy. The old gradient ran
          bottom-up, which darkened the empty area and left the network sitting
          directly behind the headline. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">Parceiro tecnológico em Moçambique</p>

          <h1 className="text-display text-balance text-[2.75rem] leading-[1.05] font-semibold text-text sm:text-6xl">
            Soluções completas em tecnologia para o seu negócio crescer.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-dim">
            Desenvolvimento de software, cloud, domínios e equipamento
            informático, tudo com um único parceiro tecnológico.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="inline-flex min-h-11 items-center gap-2 rounded-control bg-text px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
            >
              Falar connosco
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#servicos"
              className="inline-flex min-h-11 items-center rounded-control border border-line-2 px-6 py-3 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface"
            >
              Ver serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
