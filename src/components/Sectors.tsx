import {
  BankIcon,
  StoreIcon,
  BuildingIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HeartPulseIcon,
} from "./icons"

const SECTORS = [
  {
    name: "Banca & Microfinanças",
    description:
      "Soluções de gestão de crédito e controlo de risco para instituições financeiras e microfinanças.",
    icon: BankIcon,
  },
  {
    name: "Retalho & Restauração",
    description:
      "Pontos de venda e gestão de stock em tempo real para lojas, cadeias e restaurantes.",
    icon: StoreIcon,
  },
  {
    name: "Setor Público & Institucional",
    description:
      "Gestão de património e infraestrutura tecnológica para organismos públicos e instituições.",
    icon: BuildingIcon,
  },
  {
    name: "PMEs & Empreendedorismo",
    description:
      "Tecnologia acessível e escalável para pequenas e médias empresas darem o próximo passo.",
    icon: BriefcaseIcon,
  },
  {
    name: "Educação",
    description:
      "Plataformas de gestão académica e infraestrutura de TI para escolas, institutos e universidades.",
    icon: GraduationCapIcon,
  },
  {
    name: "Saúde",
    description:
      "Sistemas de gestão clínica e administrativa para garantir dados fiáveis e atendimento mais rápido.",
    icon: HeartPulseIcon,
  },
]

export function Sectors() {
  return (
    <section id="areas-estrategicas" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Áreas estratégicas</p>
          <h2 className="text-display mt-4 text-balance text-3xl font-semibold text-text sm:text-5xl">
            Sectores onde fazemos a diferença.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-text-dim">
            Focamos a nossa experiência nos sectores onde a tecnologia certa tem o maior
            impacto no negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => {
            const Icon = sector.icon
            return (
              <article key={sector.name} className="flex flex-col gap-4 bg-surface p-7 sm:p-8">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-title text-lg font-semibold text-text">{sector.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-mute">{sector.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
