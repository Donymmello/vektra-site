const PROPS = [
  {
    title: "Suporte 24/7",
    description: "Equipa disponível sempre que a sua operação precisar.",
  },
  {
    title: "Cloud-native",
    description: "Infraestrutura moderna, escalável e pronta para crescer consigo.",
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
        {/* An h2, not a styled <p>: this was the only section whose eyebrow
            wasn't backed by a real heading, so the outline jumped h1 -> h3. */}
        <h2 className="eyebrow">Porquê a Vektra</h2>

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
