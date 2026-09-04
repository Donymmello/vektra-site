// Minimal cookie-consent + Google Analytics loader, no dependencies.
//
// Nothing analytics-related ever runs before the visitor accepts: the GA
// script tag is only injected after acceptConsent() runs, either from a
// fresh "Aceitar" click or because a previous visit already said yes. If
// VITE_GA_MEASUREMENT_ID is empty (not launched yet), loadGoogleAnalytics()
// is a no-op, so the banner works fine with GA still unconfigured.

export type ConsentStatus = "accepted" | "declined"

const STORAGE_KEY = "vektra-cookie-consent"
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

declare global {
  interface Window {
    dataLayer?: unknown[][]
  }
}

type State = {
  status: ConsentStatus | null
  promptOpen: boolean
}

function readStoredStatus(): ConsentStatus | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw === "accepted" || raw === "declined" ? raw : null
  } catch {
    // Private browsing / storage disabled: treat as "no decision yet" for
    // this visit, the prompt just reappears next time too.
    return null
  }
}

let state: State = { status: readStoredStatus(), promptOpen: false }
const listeners = new Set<() => void>()

function setState(next: State) {
  state = next
  for (const listener of listeners) listener()
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getState() {
  return state
}

let gaLoaded = false

function loadGoogleAnalytics() {
  if (gaLoaded || !GA_ID) return
  gaLoaded = true

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  gtag("js", new Date())
  gtag("config", GA_ID)
}

/** Called once on app start. Restores a prior decision, or opens the prompt. */
export function initConsent() {
  if (state.status === "accepted") {
    loadGoogleAnalytics()
  } else if (state.status === null) {
    setState({ ...state, promptOpen: true })
  }
}

export function acceptConsent() {
  try {
    localStorage.setItem(STORAGE_KEY, "accepted")
  } catch {
    // Consent still applies for this visit even if it can't be remembered.
  }
  setState({ status: "accepted", promptOpen: false })
  loadGoogleAnalytics()
}

export function declineConsent() {
  try {
    localStorage.setItem(STORAGE_KEY, "declined")
  } catch {
    // See above.
  }
  setState({ status: "declined", promptOpen: false })
}

/** Reopens the banner so a visitor can change an earlier decision. */
export function openConsentPrompt() {
  setState({ ...state, promptOpen: true })
}

export function closeConsentPrompt() {
  setState({ ...state, promptOpen: false })
}
