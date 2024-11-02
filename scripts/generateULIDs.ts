import { ulid } from "ulid";

const amount = process.argv[2] ? parseInt(process.argv[2]) : 1;

for (let i = 0; i < amount; i++) {
  console.log(ulid());
}
