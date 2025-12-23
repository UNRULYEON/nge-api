import { randomUUIDv7 } from "bun";

export function generateUUID(): string {
  return randomUUIDv7();
}

// CLI usage: bun run src/utils/generate-uuid.ts [count]
if (import.meta.main) {
  const count = Number.parseInt(Bun.argv[2] ?? "1", 10);

  for (let i = 0; i < count; i++) {
    console.log(generateUUID());
  }
}
