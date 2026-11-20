import { defineConfig, devices } from "@playwright/test";

// A dedicated port, so tests never hit another app's dev server on 5173.
const PORT = 4173;

export default defineConfig({
  testDir: "src",
  testMatch: "**/*.e2e.ts",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
  },
});
