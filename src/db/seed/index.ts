import { people } from "@/db/seed/people.ts";
import { episodes } from "@/db/seed/episodes.ts";
import { directors } from "@/db/seed/directors.ts";
import { writers } from "@/db/seed/writers.ts";
import { prisma } from "@/db/client.ts";

await people(prisma);
await episodes(prisma);

await directors(prisma);
await writers(prisma);

await prisma.$disconnect();
