import { Suspense, lazy } from "react"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

// Code-split: three.js + fiber only load once the hero mounts, instead of
// blocking the initial bundle for a page that renders text first.
const HeroScene = lazy(() => import("./HeroScene"))

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-[3px] border-ink bg-navy pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene interactive={!reducedMotion} />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 border-[3px] border-cyan bg-navy px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-cyan">
            Vektra Technologies MZ
          </p>

          <h1 className="text-balance font-display text-4xl font-bold text-white sm:text-6xl">
            Soluções completas em{" "}
            <span className="text-cyan">Tecnologia</span> para o seu negócio crescer.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/75">
            Desenvolvimento web, hospedagem de domínios e equipamento
            informático, tudo com um único parceiro tecnológico, em Moçambique.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 border-[3px] border-ink bg-lime px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-brutal transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
            >
              Ver serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
