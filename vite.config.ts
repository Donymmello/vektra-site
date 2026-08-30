import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Note: the 3D hero (three.js + fiber) is already split into its own chunk
  // via the React.lazy() dynamic import in Hero.tsx, so no manual chunking is
  // needed here — Rollup does this automatically for dynamic imports.
  server: {
    proxy: {
      // In dev, the frontend always calls same-origin /api/... — this proxy
      // forwards it to the real API process, wherever it's running:
      // localhost when both run on the host (`npm run dev` in server/ too),
      // or the "api" container when using docker-compose.dev.yml.
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
