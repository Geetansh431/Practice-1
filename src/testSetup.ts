// Runs before every Vitest test file (see `setupFiles` in vite.config.ts).
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount rendered components and clear saved data so tests don't affect each other.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
