export function Team() {
  return (
    <section id="equipa" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <img
          src="/images/sidonio-aly.jpg"
          alt="Sidónio Aly, fundador da Vektra Technologies MZ"
          width={1040}
          height={768}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-card border border-line object-cover"
        />
        <div>
          <h2 className="text-display text-balance text-3xl font-semibold text-text sm:text-5xl">
            Quem está por trás da Vektra.
          </h2>
          <p className="mt-8 text-2xl font-semibold text-text">Sidónio Aly</p>
          <p className="mt-1 max-w-xl text-accent">
            Fundador e profissional de Engenharia e Gestão de TICs
          </p>
        </div>
      </div>
    </section>
  )
}
