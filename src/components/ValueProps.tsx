const PROPS = [
  {
    title: "Apoio próximo",
    description: "Acompanhamento local para as necessidades da sua operação.",
  },
  {
    title: "Soluções escaláveis",
    description: "Sistemas preparados para acompanhar o crescimento da sua empresa.",
  },
  {
    title: "Segurança em primeiro lugar",
    description: "Boas práticas de cibersegurança aplicadas em cada projeto.",
  },
  {
    title: "Equipa local",
    description: "Presença e suporte técnico em Moçambique, no seu fuso horário.",
  },
]

export function ValueProps() {
  return (
    <section id="porque-nos" className="border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-display text-balance max-w-2xl text-3xl font-semibold text-text sm:text-4xl">
          Tecnologia com acompanhamento próximo.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {/* A single-pixel gap over a hairline-coloured backdrop gives one
              continuous divider grid instead of four detached boxes: fewer
              edges on screen, which is most of what reads as "considered". */}
          {PROPS.map((item) => (
            <div key={item.title} className="bg-surface p-6 sm:p-7">
              <h3 className="text-title text-[15px] font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-mute">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
