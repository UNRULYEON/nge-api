import type { PrismaClient } from "@prisma/client";
import type { Person } from "@/types/index.ts";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const people = async (prisma: PrismaClient) => {
  return await Promise.all(
    PEOPLE.map(async ({ id, name }) => {
      let imageUrl: string | null = null;

      const fileName = name.toLowerCase().replace(" ", "-") + ".jpg";
      const path = `${import.meta.dirname}/images/${fileName}`;

      if (existsSync(path)) {
        const file = createReadStream(path);
        const { size } = statSync(path);

        const key = `production/people/${fileName}`;

        await s3Client.uploadImage({
          key,
          file,
          size,
        });

        imageUrl = `${CDN_BASE_URL}/${key}`;
      }

      return await prisma.person.upsert({
        create: {
          id,
          name,
          imageUrl,
        },
        where: {
          id,
        },
        update: {
          name,
          imageUrl,
        },
      });
    })
  );
};

export { people };

export const PEOPLE: Person[] = [
  {
    id: "01J8WYGT621JTJRF0TZYZY8EFP",
    name: "Hideaki Anno",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    name: "Kazuya Tsurumaki",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62V72HXT9P1T7BBEBV",
    name: "Masayuki",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62V4ACD7086HWEFP93",
    name: "Yōji Enokido",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62ARMJC14XREA1GJPH",
    name: "Hiroyuki Ishidō",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62J1GDTWV3DSETZQK4",
    name: "Tsuyoshi Kaga",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62JR5PWH2J9KJ5PJW7",
    name: "Keiichi Sugiyama",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62D7Y9EVKNPT392G7V",
    name: "Seiji Mizushima",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62FCB1R75Q2PC10M4S",
    name: "Tetsuya Watanabe",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62EQ96J1JQ7JATW6QX",
    name: "Tensai Okamura",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62QZ43Z2C47BFP9T51",
    name: "Masahiko Ōtsuka",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62XT8AT66D0KTRH1XE",
    name: "Ken Andō",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62N08AHNHCFJ6AFH2J",
    name: "Naoyasu Habu",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62PQG9335ZNET9GCFM",
    name: "Minoru Ōhara",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62SMA29E8WYYTK9Z7J",
    name: "Akira Takamura",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62XX62G8WRCRQ9MNEG",
    name: "Shōichi Masuo",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62PBVV5CSTGBXBAGPA",
    name: "Akio Satsukawa",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62TM0414NZPV4HV0J0",
    name: "Mitsuo Iso",
    imageUrl: "",
  },
  {
    id: "01J8WYGT62KZJXAFNZCFRB0RDF",
    name: "Hiroshi Yamaguchi",
    imageUrl: "",
  },
  {
    id: "01JAV26GX4333HXTQK3GHSBY9G",
    name: "Shinji Higuchi",
    imageUrl: "",
  },
];
