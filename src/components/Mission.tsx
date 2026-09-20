import { TargetIcon, EyeIcon, CheckIcon } from "./icons"

const VALUES = ["Transparência", "Excelência técnica", "Proximidade com o cliente", "Melhoria contínua"]

export function Mission() {
  return (
    <section id="missao" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">A nossa filosofia</p>
          <h2 className="text-display mt-4 text-balance text-3xl font-semibold text-text sm:text-5xl">
            Tecnologia com propósito, feita para durar.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-text-dim">
            O que oferecemos é uma relação de confiança a longo prazo, não apenas
            serviços pontuais.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="card flex flex-col p-8 sm:p-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-accent/10 text-accent">
              <TargetIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-title mt-6 text-xl font-semibold text-text">Missão</h3>
            <p className="mt-3 leading-relaxed text-text-dim">
              Entregar tecnologia acessível e de confiança, do registo de domínios ao
              equipamento mais avançado, para que qualquer empresa em Moçambique possa
              operar ao nível internacional.
            </p>
          </article>

          <article className="card flex flex-col p-8 sm:p-10">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-accent/10 text-accent">
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-title mt-6 text-xl font-semibold text-text">Visão</h3>
            <p className="mt-3 leading-relaxed text-text-dim">
              Ser o parceiro tecnológico de referência em Moçambique, com os sistemas que
              vão mover os negócios do país na próxima década.
            </p>
          </article>
        </div>

        <div className="card mt-4 flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <h3 className="text-title text-sm font-medium text-text-dim">Os nossos valores</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {VALUES.map((value) => (
              <li key={value} className="inline-flex items-center gap-2 text-sm text-text">
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
