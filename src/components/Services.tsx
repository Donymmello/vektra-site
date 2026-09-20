import { services } from "../data/services"
import { CheckIcon } from "./icons"

export function Services() {
  return (
    <section id="servicos" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">O que fazemos</p>
          <h2 className="text-display mt-4 text-balance text-3xl font-semibold text-text sm:text-5xl">
            Um único parceiro para toda a sua tecnologia.
          </h2>
        </div>

        <div className="mt-14 grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.id}
                className={`card flex flex-col justify-between p-7 ${
                  service.span === "lg" ? "sm:col-span-2" : "sm:col-span-1"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    {/* Icon chip: a low-opacity accent wash rather than a
                        filled block with a hard border. */}
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    {service.badge && (
                      <span className="inline-flex items-center rounded-full border border-line-2 px-2.5 py-1 text-[11px] font-medium text-text-dim">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-title mt-6 text-lg font-semibold text-text">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-text-dim">{service.description}</p>
                </div>

                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="inline-flex items-center gap-1.5 text-sm text-text-mute"
                    >
                      <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
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
