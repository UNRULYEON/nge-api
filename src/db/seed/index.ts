import { people } from "@/db/seed/people.ts";
import { episodes } from "@/db/seed/episodes.ts";
import { directors } from "@/db/seed/directors.ts";
import { writers } from "@/db/seed/writers.ts";

await people();
await episodes();

await directors();
await writers();
