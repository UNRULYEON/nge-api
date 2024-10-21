import { prisma } from "@/db/client.ts";
import { ulid } from "jsr:@std/ulid";

await prisma.person.create({
  data: {
    id: ulid(),
    name: "hello, world",
  },
});
