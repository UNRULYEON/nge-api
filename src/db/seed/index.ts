import { people } from "@/db/seed/people";
import { episodes } from "@/db/seed/episodes";
import { directors } from "@/db/seed/directors";
import { writers } from "@/db/seed/writers";
import { characters } from "@/db/seed/characters";
import { prisma } from "@/db";

await people(prisma);
await episodes(prisma);

await directors(prisma);
await writers(prisma);

await characters(prisma);

await prisma.$disconnect();
