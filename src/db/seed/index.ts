import { people } from "@/db/seed/people";
import { episodes } from "@/db/seed/episodes";
import { directors } from "@/db/seed/directors";
import { writers } from "@/db/seed/writers";
import { prisma } from "@/db";

await people(prisma);
await episodes(prisma);

await directors(prisma);
await writers(prisma);

await prisma.$disconnect();
