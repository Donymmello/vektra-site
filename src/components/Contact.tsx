import { type FormEvent, useState } from "react"
import { ArrowRightIcon, MailIcon, GlobeIcon } from "./icons"

// TODO(vektra): point this at the real inbox / form endpoint before launch.
const CONTACT_EMAIL = "contacto@vektratechnologies.com"

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Pedido de orçamento — ${form.get("name") ?? ""}`)
    const body = encodeURIComponent(String(form.get("message") ?? ""))
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contacto" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cyan-deep">
            Contacto
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold sm:text-5xl">
            Vamos construir a próxima etapa do seu negócio.
          </h2>
          <p className="mt-5 max-w-md text-ink/70">
            Conte-nos o que precisa e a nossa equipa entra em contacto para preparar uma
            proposta à medida.
          </p>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-ink bg-white">
                <MailIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium hover:text-cyan-deep">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-ink bg-white">
                <GlobeIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <a href="https://vektratechnologies.com" className="font-medium hover:text-cyan-deep">
                vektratechnologies.com
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-[3px] border-ink bg-white p-7 shadow-brutal sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="font-display text-xs font-bold uppercase tracking-wide">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="mt-2 w-full border-[3px] border-ink bg-paper px-4 py-3 text-base outline-none focus-visible:outline-[3px] focus-visible:outline-cyan-deep"
              />
            </div>

            <div>
              <label htmlFor="email" className="font-display text-xs font-bold uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full border-[3px] border-ink bg-paper px-4 py-3 text-base outline-none focus-visible:outline-[3px] focus-visible:outline-cyan-deep"
              />
            </div>

            <div>
              <label htmlFor="message" className="font-display text-xs font-bold uppercase tracking-wide">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-2 w-full border-[3px] border-ink bg-paper px-4 py-3 text-base outline-none focus-visible:outline-[3px] focus-visible:outline-cyan-deep"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 border-[3px] border-ink bg-lime px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
            >
              Enviar mensagem
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <p role="status" className="text-sm text-ink/60">
              {sent
                ? "A abrir o seu email para concluir o envio…"
                : "Ao enviar, abrimos o seu cliente de email com a mensagem pronta."}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
