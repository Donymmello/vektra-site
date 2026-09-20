import { useState } from "react"
import { Logo } from "./Logo"
import { MenuIcon, CloseIcon } from "./icons"

// Kept short on purpose. "Porquê nós" and "Sectores" ainda existem como
// secções na página, só não precisam de um link próprio no topo. "Contacto"
// is deliberately not in this list: it gets its own pill CTA instead of
// sitting in the plain link row (see CONTACT_LINK below); the mobile
// dropdown adds it back at the end so it isn't lost there.
const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#missao", label: "Sobre" },
]

const CONTACT_LINK = { href: "#contacto", label: "Falar connosco" }

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="inline-flex min-h-11 min-w-11 items-center"
          aria-label="Vektra Technologies MZ, início"
        >
          <Logo showWordmark={false} />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-text-dim transition-colors duration-200 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA is a white fill on a near-black page: the highest
            contrast available, which is what makes it read as the one action
            without needing a loud brand colour. */}
        <div className="hidden items-center md:flex">
          <a
            href={CONTACT_LINK.href}
            className="rounded-control bg-text px-4 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            {CONTACT_LINK.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-control text-text transition-colors duration-200 hover:bg-surface md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="flex flex-col border-t border-line bg-bg px-4 py-2 sm:px-6 md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[15px] text-text-dim transition-colors duration-200 last:border-b-0 hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT_LINK.href}
            onClick={() => setOpen(false)}
            className="mt-3 mb-2 rounded-control bg-text px-4 py-3 text-center text-sm font-medium text-bg"
          >
            {CONTACT_LINK.label}
          </a>
        </nav>
      )}
    </header>
  )
}
