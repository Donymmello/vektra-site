import { TargetIcon, EyeIcon, CheckIcon } from "./icons"

const VALUES = ["Transparência", "Excelência técnica", "Proximidade com o cliente", "Melhoria contínua"]

export function Mission() {
  return (
    <section id="missao" className="border-b-[3px] border-ink bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-deep">
            A nossa filosofia
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-5xl">
            Tecnologia com propósito, feita para durar.
          </h2>
          <p className="mt-4 max-w-xl text-ink/70">
            Não vendemos apenas serviços — construímos relações de longo prazo com quem
            confia em nós para sustentar o seu negócio.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <article className="bento-card flex flex-col p-7 sm:p-9">
            <div className="inline-flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-cyan-soft text-ink">
              <TargetIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Missão</h3>
            <p className="mt-3 text-ink/70">
              Entregar tecnologia acessível e de confiança — do registo de domínios ao
              equipamento mais avançado — para que qualquer empresa em Moçambique possa
              operar ao nível internacional.
            </p>
          </article>

          <article className="bento-card flex flex-col p-7 sm:p-9">
            <div className="inline-flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-lime text-ink">
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Visão</h3>
            <p className="mt-3 text-ink/70">
              Ser reconhecida como o parceiro tecnológico de referência em Moçambique,
              construindo os sistemas que vão mover os negócios do país na próxima década.
            </p>
          </article>
        </div>

        <div className="bento-card mt-5 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide">Os nossos valores</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {VALUES.map((value) => (
              <li key={value} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80">
                <CheckIcon className="h-4 w-4 shrink-0 text-cyan-deep" aria-hidden="true" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
