import { useState } from "react"
import { Logo } from "./Logo"
import { MenuIcon, CloseIcon } from "./icons"

// Kept short on purpose. "Porquê nós" and "Sectores" ainda existem como
// secções na página, só não precisam de um link próprio no topo.
const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#missao", label: "Sobre" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-4 top-4 z-50 sm:inset-x-6 sm:top-6">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between border-[3px] border-ink bg-paper/95 px-4 py-3 shadow-brutal-sm backdrop-blur sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Vektra Technologies MZ, início">
          <Logo showWordmark={false} />
        </a>

        <nav
          className="hidden items-center gap-7 md:absolute md:left-1/2 md:flex md:-translate-x-1/2"
          aria-label="Navegação principal"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-display text-[15px] font-medium text-ink/80 transition-colors hover:text-cyan-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-paper text-ink md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 border-[3px] border-ink bg-paper p-3 shadow-brutal-sm md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 px-2 py-3 font-display text-base font-medium text-ink last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
