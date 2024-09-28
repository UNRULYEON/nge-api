import { ulid } from "jsr:@std/ulid";

const amount = Deno.args[0] ? parseInt(Deno.args[0]) : 1;

for (let i = 0; i < amount; i++) {
  console.log(ulid());
}
