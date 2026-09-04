import { useSyncExternalStore } from "react"
import {
  acceptConsent,
  closeConsentPrompt,
  declineConsent,
  getState,
  openConsentPrompt,
  subscribe,
} from "../lib/consent"

/** Reactive view over the cookie-consent store (src/lib/consent.ts). */
export function useCookieConsent() {
  const state = useSyncExternalStore(subscribe, getState, getState)

  return {
    status: state.status,
    promptOpen: state.promptOpen,
    accept: acceptConsent,
    decline: declineConsent,
    openPrompt: openConsentPrompt,
    closePrompt: closeConsentPrompt,
  }
}
