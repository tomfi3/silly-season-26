import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages — repo name. Update if the repo is renamed.
  base: '/silly-season-26/',
  plugins: [react(), tailwindcss()],
})
