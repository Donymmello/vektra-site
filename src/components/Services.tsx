import { services } from "../data/services"
import { CheckIcon } from "./icons"

export function Services() {
  return (
    <section id="servicos" className="border-b-[3px] border-ink bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-deep">
            O que fazemos
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-5xl">
            Um único parceiro para toda a sua tecnologia.
          </h2>
        </div>

        <div className="mt-14 grid grid-flow-row-dense gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.id}
                className={`bento-card flex flex-col justify-between p-7 ${
                  service.span === "lg" ? "sm:col-span-2" : "sm:col-span-1"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-cyan-soft text-ink">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {service.badge && (
                      <span className="mt-1 inline-flex items-center border-[3px] border-ink bg-lime px-2 py-1 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold">{service.title}</h3>
                  <p className="mt-2.5 text-ink/70">{service.description}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80">
                      <CheckIcon className="h-4 w-4 shrink-0 text-cyan-deep" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
