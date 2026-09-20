import { type FormEvent, useState } from "react"
import { ArrowRightIcon, MailIcon, GlobeIcon, PhoneIcon } from "./icons"

const CONTACT_EMAIL = "contacto@vektramz.com"
const CONTACT_PHONE = "+258 86 916 4456"
const CONTACT_PHONE_HREF = "+258869164456"

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
          // hidden input below): the API silently drops the submission if
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

  const inputClass =
    "mt-2 w-full rounded-control border border-line-input bg-bg px-4 py-3 text-base text-text placeholder:text-text-mute transition-colors duration-200 outline-none focus-visible:border-accent"

  return (
    <section id="contacto" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2 className="text-display mt-4 text-balance text-3xl font-semibold text-text sm:text-5xl">
            Vamos construir a próxima etapa do seu negócio.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-text-dim">
            Conte-nos o que precisa e a nossa equipa entra em contacto para preparar uma
            proposta à medida.
          </p>

          <ul className="mt-10 space-y-1">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex min-h-11 items-center gap-3 text-text-dim transition-colors duration-200 hover:text-text"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-text-mute" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="group inline-flex min-h-11 items-center gap-3 text-text-dim transition-colors duration-200 hover:text-text"
              >
                <PhoneIcon className="h-4 w-4 shrink-0 text-text-mute" aria-hidden="true" />
                {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <a
                href="https://vektramz.com"
                className="group inline-flex min-h-11 items-center gap-3 text-text-dim transition-colors duration-200 hover:text-text"
              >
                <GlobeIcon className="h-4 w-4 shrink-0 text-text-mute" aria-hidden="true" />
                vektramz.com
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card p-7 sm:p-8">
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-text-dim">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-text-dim">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-text-dim">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Honeypot: hidden from real visitors via CSS, not "type=hidden"
                (bots fill hidden-type fields less reliably than ones merely
                positioned off-screen). Never remove the name/tabIndex combo. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-text px-6 py-3 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "A enviar…" : "Enviar mensagem"}
              {status !== "sending" && <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />}
            </button>

            <p role="status" className="text-sm text-text-mute">
              {status === "sent" && "Mensagem enviada. Entramos em contacto em breve."}
              {status === "error" && (
                <>
                  Não foi possível enviar agora. Tenta de novo ou escreve para{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
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
