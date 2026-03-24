import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages typically serves the app from https://<user>.github.io/<repo> (a sub-path).
  // Using a relative base prevents broken asset URLs.
  base: './',
})
