import { Logo } from "./Logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-[3px] border-ink bg-navy-deep py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Logo variant="dark" />
        <p className="text-sm text-white/50">
          © {year} Vektra Technologies MZ. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
