import { ArrowRightIcon } from "./icons"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden border-b border-line py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="hero-intro-item eyebrow mb-5">Parceiro tecnológico em Moçambique</p>

          <h1 className="hero-intro-item text-display text-balance max-w-[18ch] text-[2.75rem] leading-[1.05] font-semibold text-text sm:text-5xl">
            Tecnologia para o seu negócio crescer.
          </h1>

          <p className="hero-intro-item mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
            Software, domínios, alojamento e equipamento informático, com apoio local para a
            sua empresa.
          </p>

          <div className="hero-intro-item mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-opacity duration-200 hover:opacity-90"
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
