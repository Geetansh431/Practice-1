import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom gives component tests a browser-like DOM and localStorage.
    environment: 'jsdom',
    setupFiles: ['./src/testSetup.ts'],
  },
})
