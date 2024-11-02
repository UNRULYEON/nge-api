import type { PrismaClient } from "@prisma/client";
import type { Character } from "@/types/index.ts";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const characters = async (prisma: PrismaClient) => {
  return await Promise.all(
    CHARACTERS.map(async ({ id, name }) => {
      let imageUrl: string | null = null;

      const fileName = name.toLowerCase().replace(" ", "-") + ".jpg";
      const path = `${import.meta.dirname}/images/${fileName}`;

      if (existsSync(path)) {
        const file = createReadStream(path);
        const { size } = statSync(path);

        const key = `production/characters/${fileName}`;

        await s3Client.uploadImage({
          key,
          file,
          size,
        });

        imageUrl = `${CDN_BASE_URL}/${key}`;
      }

      return await prisma.character.upsert({
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

export { characters };

export const CHARACTERS: Character[] = [
  {
    id: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    name: "Shinji Ikari",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    name: "Rei Ayanami",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKK6XX01VY14HFA3AA4",
    name: "Asuka Langley Sohryu",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKF2EY0SV7TNWE99S1",
    name: "Toji Suzuhara",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    name: "Kaworu Nagisa",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKM65D1S0CDV4ARDE2",
    name: "Asuka Shikinami Langley",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKDCK57789XDGXJMCX",
    name: "Mari Makinami Illustrious",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    name: "Gendo Ikari",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKKWXC05NW6EQRQ42P6",
    name: "Kozo Fuyutsuki",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    name: "Misato Katsuragi",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMXRPXDRGEB3407B1D",
    name: "Ritsuko Akagi",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMAF8R9DMFNRZWYP15",
    name: "Ryoji Kaji",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMCQDZBX6BJ43886BJ",
    name: "Makoto Hyuga",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKM9XAVTH8BB5B4GP9K",
    name: "Maya Ibuki",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKM6R2GT81R7PKHTA3E",
    name: "Shigeru Aoba",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMADXDSB0D2QW6T6AF",
    name: "Naoko Akagi",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMB9XQ7XCP0RFDPCX8",
    name: "Yui Ikari",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKM312C39GEZC20RPAG",
    name: "Kyoko Zeppelin Soryu",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKMZPC9APE1N9AYMGJS",
    name: "Keel Lorenz",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKM5QDVXVWZN9T7HS6M",
    name: "Kensuke Aida",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKNEBSGMMFPJFBXXFV4",
    name: "Hikari Horaki",
    imageUrl: "",
  },
  {
    id: "01JBN9BCKN60VAV2T3M5WPK523",
    name: "Pen Pen",
    imageUrl: "",
  },
];
