const PROPS = [
  {
    title: "Suporte 24/7",
    description: "Equipa disponível sempre que a sua operação precisar.",
    accent: "bg-cyan",
  },
  {
    title: "Cloud-native",
    description: "Infraestrutura moderna, escalável e pronta para crescer consigo.",
    accent: "bg-lime",
  },
  {
    title: "Segurança em primeiro lugar",
    description: "Boas práticas de cibersegurança aplicadas em cada projeto.",
    accent: "bg-cyan",
  },
  {
    title: "Equipa local",
    description: "Presença e suporte técnico em Moçambique, no seu fuso horário.",
    accent: "bg-lime",
  },
]

export function ValueProps() {
  return (
    <section id="porque-nos" className="border-b-[3px] border-ink bg-navy py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan">
          Porquê a Vektra
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROPS.map((item) => (
            <div key={item.title} className="border-[3px] border-white/15 bg-navy-deep p-6">
              <div className={`h-1.5 w-10 ${item.accent}`} aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/65">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
