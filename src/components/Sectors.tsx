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
    <section id="areas-estrategicas" className="border-b-[3px] border-ink bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan">
            Áreas estratégicas
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-white sm:text-5xl">
            Sectores onde fazemos a diferença.
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Focamos a nossa experiência nos sectores onde a tecnologia certa tem o maior
            impacto no negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => {
            const Icon = sector.icon
            return (
              <article key={sector.name} className="bento-card flex flex-col items-start gap-4 p-7 sm:flex-row sm:gap-5">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-ink bg-lime text-ink">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{sector.name}</h3>
                  <p className="mt-2 text-ink/70">{sector.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
