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

const CONTACT_LINK = { href: "#contacto", label: "Contacto" }

// Vercel-style chrome: a slim, full-bleed dark bar with a hairline border
// instead of the thick-bordered, hard-shadowed "card" every other panel on
// this site uses. Deliberately breaks from the neobrutalist system, just
// for this one piece of persistent UI, per explicit request.
export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Vektra Technologies MZ, início">
          <Logo showWordmark={false} />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CONTACT_LINK.href}
            className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-85"
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegação móvel"
          className="flex flex-col border-t border-white/10 bg-navy px-4 py-2 sm:px-6 md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 text-[15px] font-medium text-white/80 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACT_LINK.href}
            onClick={() => setOpen(false)}
            className="mt-3 mb-2 rounded-full bg-lime px-4 py-2.5 text-center text-sm font-semibold text-ink"
          >
            {CONTACT_LINK.label}
          </a>
        </nav>
      )}
    </header>
  )
}
