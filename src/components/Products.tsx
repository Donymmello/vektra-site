import { products } from "../data/products"
import { CheckIcon, ArrowRightIcon } from "./icons"

export function Products() {
  return (
    <section id="produtos" className="border-b-[3px] border-ink bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan">
              Os nossos produtos
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-white sm:text-5xl">
              Sistemas próprios, feitos para o seu negócio.
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              Além de serviços à medida, desenvolvemos e mantemos os nossos próprios sistemas,
              prontos a adaptar à sua operação.
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex shrink-0 items-center gap-2 border-[3px] border-white bg-transparent px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            Peça uma demonstração
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
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
                className={`bento-card flex flex-col p-7 ${
                  product.url
                    ? "transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-cyan"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center border-[3px] border-ink bg-lime text-ink">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="mt-1 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-deep">
                    {product.category}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold">{product.name}</h3>
                {product.brandNote && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/50">
                    {product.brandNote}
                  </p>
                )}

                <p className="mt-3 text-ink/70">{product.description}</p>

                <ul className="mt-6 space-y-2">
                  {product.bullets.map((bullet) => (
                    <li key={bullet} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/80">
                      <CheckIcon className="h-4 w-4 shrink-0 text-cyan-deep" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {product.url && (
                  <p className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-cyan-deep">
                    Aceder ao sistema
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
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
