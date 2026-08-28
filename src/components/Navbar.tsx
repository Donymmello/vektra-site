import { useState } from "react"
import { Logo } from "./Logo"
import { MenuIcon, CloseIcon, ArrowRightIcon } from "./icons"

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#porque-nos", label: "Porquê nós" },
  { href: "#missao", label: "Missão" },
  { href: "#areas-estrategicas", label: "Sectores" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-4 top-4 z-50 sm:inset-x-6 sm:top-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-[3px] border-ink bg-paper/95 px-4 py-3 shadow-brutal-sm backdrop-blur sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Vektra Technologies MZ — início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-display text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:text-cyan-deep xl:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden shrink-0 items-center gap-2 whitespace-nowrap border-[3px] border-ink bg-lime px-3 py-2 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal lg:inline-flex xl:px-4"
        >
          Pedir orçamento
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-paper text-ink lg:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 border-[3px] border-ink bg-paper p-3 shadow-brutal-sm lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 px-2 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 border-[3px] border-ink bg-lime px-4 py-3 font-display text-sm font-bold uppercase tracking-wide text-ink"
          >
            Pedir orçamento
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  )
}
