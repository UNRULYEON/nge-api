import { prisma } from "@/db/client.ts";
import type { Person } from "@/types/index.ts";

const people = async () => {
  return await Promise.all(PEOPLE.map(async ({ id, name }) => {
    return await prisma.person.upsert({
      create: {
        id,
        name,
      },
      where: {
        id,
      },
      update: {
        name,
      },
    });
  }));
};

export { people };

export const PEOPLE: Person[] = [
  {
    id: "01J8WYGT621JTJRF0TZYZY8EFP",
    name: "Hideaki Anno",
  },
  {
    id: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    name: "Kazuya Tsurumaki",
  },
  {
    id: "01J8WYGT62V72HXT9P1T7BBEBV",
    name: "Masayuki",
  },
  {
    id: "01J8WYGT62V4ACD7086HWEFP93",
    name: "Yōji Enokido",
  },
  {
    id: "01J8WYGT62ARMJC14XREA1GJPH",
    name: "Hiroyuki Ishidō",
  },
  {
    id: "01J8WYGT62J1GDTWV3DSETZQK4",
    name: "Tsuyoshi Kaga",
  },
  {
    id: "01J8WYGT62JR5PWH2J9KJ5PJW7",
    name: "Keiichi Sugiyama",
  },
  {
    id: "01J8WYGT62D7Y9EVKNPT392G7V",
    name: "Seiji Mizushima",
  },
  {
    id: "01J8WYGT62FCB1R75Q2PC10M4S",
    name: "Tetsuya Watanabe",
  },
  {
    id: "01J8WYGT62EQ96J1JQ7JATW6QX",
    name: "Tensai Okamura",
  },
  {
    id: "01J8WYGT62QZ43Z2C47BFP9T51",
    name: "Masahiko Ōtsuka",
  },
  {
    id: "01J8WYGT62XT8AT66D0KTRH1XE",
    name: "Ken Andō",
  },
  {
    id: "01J8WYGT62N08AHNHCFJ6AFH2J",
    name: "Naoyasu Habu",
  },
  {
    id: "01J8WYGT62PQG9335ZNET9GCFM",
    name: "Minoru Ōhara",
  },
  {
    id: "01J8WYGT62SMA29E8WYYTK9Z7J",
    name: "Akira Takamura",
  },
  {
    id: "01J8WYGT62XX62G8WRCRQ9MNEG",
    name: "Shōichi Masuo",
  },
  {
    id: "01J8WYGT62PBVV5CSTGBXBAGPA",
    name: "Akio Satsukawa",
  },
  {
    id: "01J8WYGT62TM0414NZPV4HV0J0",
    name: "Mitsuo Iso",
  },
  {
    id: "01J8WYGT62KZJXAFNZCFRB0RDF",
    name: "Hiroshi Yamaguchi",
  },
  {
    id: "01JAV26GX4333HXTQK3GHSBY9G",
    name: "Shinji Higuchi",
  },
];
