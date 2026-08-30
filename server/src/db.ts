import Database from "better-sqlite3"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"

const DB_PATH = process.env.DATABASE_PATH ?? "./data/vektra.db"
mkdirSync(dirname(DB_PATH), { recursive: true })

export const db = new Database(DB_PATH)
db.pragma("journal_mode = WAL")

// Every submission is kept even if the email send fails afterwards — a lead
// is never silently lost just because SMTP had a bad moment.
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    email_sent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

export type ContactSubmission = {
  name: string
  email: string
  message: string
}

export function saveSubmission(submission: ContactSubmission): number {
  const stmt = db.prepare(
    "INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)",
  )
  const result = stmt.run(submission.name, submission.email, submission.message)
  return Number(result.lastInsertRowid)
}

export function markEmailSent(id: number): void {
  db.prepare("UPDATE contact_submissions SET email_sent = 1 WHERE id = ?").run(id)
}
