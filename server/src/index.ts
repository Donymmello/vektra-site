import "dotenv/config"
import express from "express"
import cors from "cors"
import { contactRouter } from "./routes/contact.js"

const app = express()
const PORT = Number(process.env.PORT ?? 3001)
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173"

app.use(cors({ origin: CORS_ORIGIN }))
app.use(express.json({ limit: "20kb" }))

app.get("/api/healthz", (_req, res) => res.status(200).send("ok"))
app.use("/api", contactRouter)

app.listen(PORT, () => {
  console.log(`[api] a correr em http://localhost:${PORT}`)
})
