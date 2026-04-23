import { parseArgs } from "node:util";

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    count: { type: "string", short: "c" },
  },
});

const parseCount = (input: string | null | undefined) => {
  if (input == null || input === "") return null;
  const n = Number(input);
  if (!Number.isInteger(n) || n < 1) {
    console.error(`Invalid count: ${input}`);
    process.exit(1);
  }
  return n;
};

let count = parseCount(values.count);

if (count === null) {
  count = parseCount(prompt("How many UUIDs?", "1")) ?? 1;
}

for (let i = 0; i < count; i++) {
  console.log(Bun.randomUUIDv7());
}
