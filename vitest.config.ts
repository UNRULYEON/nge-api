import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: process.env.GITHUB_ACTIONS
        ? ["text", "json-summary", "json"]
        : ["html"],
      reportOnFailure: true,
      exclude: ["vitest.config.ts", "src/db/seed/**/*", "src/schemas/**/*"],
    },
  },
});
