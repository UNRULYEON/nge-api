import { migrate } from "@/db/migrate";
import { seed } from "@/db/seed";

migrate();
await seed();
