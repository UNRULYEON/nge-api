import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: process.env.GITHUB_ACTIONS
        ? ["text", "json-summary", "json", "github-actions"]
        : ["html"],
      reportOnFailure: true,
      exclude: ["vitest.config.ts", "src/db/seed/**/*", "src/schemas/**/*"],
      thresholds: {
        lines: 60,
        branches: 60,
        functions: 60,
        statements: 60,
      },
    },
  },
});
