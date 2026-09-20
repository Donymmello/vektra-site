import { products } from "../data/products"
import { CheckIcon, ArrowRightIcon } from "./icons"

export function Products() {
  return (
    <section id="produtos" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Os nossos produtos</p>
            <h2 className="text-display mt-4 text-balance text-3xl font-semibold text-text sm:text-5xl">
              Sistemas próprios, feitos para o seu negócio.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-text-dim">
              Além de serviços à medida, desenvolvemos e mantemos os nossos próprios sistemas,
              prontos a adaptar à sua operação.
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-control border border-line-2 px-5 py-3 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface"
          >
            Peça uma demonstração
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon
            // Every product follows the same rule: once it has a live `url`
            // in src/data/products.ts, its card becomes clickable and opens
            // that subdomain. Until then it stays a plain, non-linked panel.
            const Wrapper = product.url ? "a" : "article"
            const linkProps = product.url
              ? { href: product.url, target: "_blank", rel: "noopener noreferrer" }
              : {}

            return (
              <Wrapper
                key={product.id}
                {...linkProps}
                className={`card flex flex-col p-7 ${product.url ? "card-interactive" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-control ${
                      product.url ? "bg-accent/10 text-accent" : "bg-surface-2 text-text-mute"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-medium tracking-wide text-text-mute uppercase">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-title mt-6 text-xl font-semibold text-text">{product.name}</h3>
                {product.brandNote && (
                  <p className="mt-1 text-xs text-text-mute">{product.brandNote}</p>
                )}

                <p className="mt-3 leading-relaxed text-text-dim">{product.description}</p>

                <ul className="mt-6 space-y-2">
                  {product.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="inline-flex items-center gap-2 text-sm text-text-mute"
                    >
                      <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {product.url ? (
                  <p className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Aceder ao sistema
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </p>
                ) : (
                  <p className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-text-mute">
                    Brevemente
                  </p>
                )}
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
