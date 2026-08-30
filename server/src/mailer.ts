import nodemailer from "nodemailer"
import type { ContactSubmission } from "./db.js"

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL)

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null

/**
 * Sends the contact-form lead to the Vektra inbox. Without SMTP env vars
 * configured (e.g. running locally before the real mailbox exists), this
 * logs the message instead of failing — the submission is still saved to
 * the database either way, so no lead is lost. Returns whether an email was
 * actually sent, so callers don't mark a merely-simulated send as delivered.
 */
export async function sendContactEmail(submission: ContactSubmission): Promise<boolean> {
  if (!transporter) {
    console.warn(
      "[mailer] SMTP não configurado (ver server/.env.example) — a simular envio:",
      submission,
    )
    return false
  }

  await transporter.sendMail({
    from: `"Site Vektra" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: submission.email,
    subject: `Novo pedido de orçamento: ${submission.name}`,
    text: `Nome: ${submission.name}\nEmail: ${submission.email}\n\n${submission.message}`,
  })
  return true
}
