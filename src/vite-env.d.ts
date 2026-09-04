/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * GA4 Measurement ID (format G-XXXXXXXXXX). Leave unset/empty to keep
   * Google Analytics disabled: the consent banner still shows, but nothing
   * ever loads or fires until a real ID is provided. See .env.example.
   */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
