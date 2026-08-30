import type { NextFunction, Request, Response } from "express"

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

const hits = new Map<string, number[]>()

// Single-process in-memory limiter — correct as long as the API runs as one
// instance. If it's ever scaled to multiple instances, this needs to move
// to a shared store (e.g. Redis); not needed at Vektra's current scale.
export function contactRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? "unknown"
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    res.status(429).json({ error: "Demasiados pedidos. Tenta novamente mais tarde." })
    return
  }

  recent.push(now)
  hits.set(ip, recent)
  next()
}
