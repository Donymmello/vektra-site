import { Router } from "express"
import { saveSubmission, markEmailSent } from "../db.js"
import { sendContactEmail } from "../mailer.js"
import { contactRateLimit } from "../rateLimit.js"

export const contactRouter = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

contactRouter.post("/contact", contactRateLimit, async (req, res) => {
  const { name, email, message, website } = req.body ?? {}

  // Honeypot: a real visitor never fills this hidden field, a bot usually
  // does. Pretend success so the bot doesn't learn it was caught.
  if (typeof website === "string" && website.trim() !== "") {
    res.status(200).json({ ok: true })
    return
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    message.trim().length < 5 ||
    !EMAIL_RE.test(email.trim())
  ) {
    res.status(400).json({ error: "Preenche o nome, email e mensagem corretamente." })
    return
  }

  const submission = { name: name.trim(), email: email.trim(), message: message.trim() }
  const id = saveSubmission(submission)

  try {
    const wasSent = await sendContactEmail(submission)
    if (wasSent) markEmailSent(id)
  } catch (err) {
    // The lead is already saved — a broken SMTP config shouldn't make the
    // visitor think their message vanished.
    console.error("[contact] falha ao enviar email, mas o pedido ficou guardado:", err)
  }

  res.status(200).json({ ok: true })
})
