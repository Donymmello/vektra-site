import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Note: the 3D hero (three.js + fiber) is already split into its own chunk
  // via the React.lazy() dynamic import in Hero.tsx, so no manual chunking is
  // needed here — Rollup does this automatically for dynamic imports.
})
