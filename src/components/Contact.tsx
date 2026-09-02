import { type FormEvent, useState } from "react"
import { ArrowRightIcon, MailIcon, GlobeIcon } from "./icons"

const CONTACT_EMAIL = "contacto@vektramz.com"

type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          // Honeypot: real visitors never see or fill this field (see the
          // hidden input below) — the API silently drops the submission if
          // it comes back non-empty.
          website: data.get("website"),
        }),
      })

      if (!res.ok) throw new Error(await res.text())

      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
    }
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
              <a href="https://vektramz.com" className="font-medium hover:text-cyan-deep">
                vektramz.com
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

            {/* Honeypot — hidden from real visitors via CSS, not "type=hidden"
                (bots fill hidden-type fields less reliably than ones merely
                positioned off-screen). Never remove the name/tabIndex combo. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 border-[3px] border-ink bg-lime px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm"
            >
              {status === "sending" ? "A enviar…" : "Enviar mensagem"}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <p role="status" className="text-sm text-ink/60">
              {status === "sent" && "Mensagem enviada — entramos em contacto em breve."}
              {status === "error" && (
                <>
                  Não foi possível enviar agora. Tenta de novo ou escreve para{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </>
              )}
              {(status === "idle" || status === "sending") &&
                "A equipa Vektra responde normalmente dentro de 1 dia útil."}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
