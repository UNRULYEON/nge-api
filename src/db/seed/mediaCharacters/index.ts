import { Media, type PrismaClient } from "@prisma/client";
import { type MediaCharacter } from "@/types";
import { s3Client } from "@/s3";
import { createReadStream, statSync, existsSync } from "fs";
import { CDN_BASE_URL } from "@/constants";

const mediaCharacters = async (prisma: PrismaClient) => {
  console.log(`Seeding ${MEDIA_CHARACTERS.length} media characters`);

  return await Promise.all(
    MEDIA_CHARACTERS.map(
      async (
        { id, movieId, episodeId, characterId, media, characterName },
        index
      ) => {
        let imageUrl: string | null = null;

        const fileName = id + ".jpg";
        const path = `${import.meta.dirname}/images/${fileName}`;

        if (existsSync(path)) {
          const file = createReadStream(path);
          const { size } = statSync(path);

          const key = `production/media-characters/${fileName}`;

          await s3Client.uploadImage({
            key,
            file,
            size,
          });

          imageUrl = `${CDN_BASE_URL}/${key}`;
        }

        try {
          return await prisma.mediaCharacter.upsert({
            create: {
              id,
              movieId,
              episodeId,
              characterId,
              media,
              characterName,
              imageUrl,
            },
            where: {
              id,
            },
            update: {
              movieId,
              episodeId,
              characterId,
              media,
              characterName,
              imageUrl,
            },
          });
        } catch (error) {
          console.error(
            `Error seeding media character ${characterName} (id: ${id}) (index: ${index})`
          );
          console.error(error);
          throw error;
        }
      }
    )
  );
};

export { mediaCharacters };

export const MEDIA_CHARACTERS: MediaCharacter[] = [
  // Neon Genesis Evangelion: Death & Rebirth
  {
    id: "01JD2WWK27987V44MTSBEMFGNH",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    media: Media.MOVIE,
    characterName: "Shinji Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2AX9EVC0EF863H8E0Y",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    media: Media.MOVIE,
    characterName: "Misato Katsuragi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK28Y69YPSG90QNAWEDC",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    media: Media.MOVIE,
    characterName: "Rei Ayanami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK28KMTXE0PSG7R5WB03",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKK6XX01VY14HFA3AA4",
    media: Media.MOVIE,
    characterName: "Asuka Langley Sohryu",
    imageUrl: null,
  },
  {
    id: "01JD2WWK28TT8TCQHTY6J0M0E4",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    media: Media.MOVIE,
    characterName: "Gendo Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK28KHSC8V7SM0WR3JZ8",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMXRPXDRGEB3407B1D",
    media: Media.MOVIE,
    characterName: "Ritsuko Akagi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK284G0WNTMH8FE4BTSZ",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMAF8R9DMFNRZWYP15",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
  {
    id: "01JD2WWK28AX22YZFVRB233RDR",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    media: Media.MOVIE,
    characterName: "Kaworu Nagisa",
    imageUrl: null,
  },
  {
    id: "01JD2WWK298Z4K6AZ7K7CPSJSM",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKKF2EY0SV7TNWE99S1",
    media: Media.MOVIE,
    characterName: "Tōji Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK29JFCZ4HX98MRNDN70",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKKWXC05NW6EQRQ42P6",
    media: Media.MOVIE,
    characterName: "Kōzō Fuyutsuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK29ST14A2PD1B7S6ND0",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMZPC9APE1N9AYMGJS",
    media: Media.MOVIE,
    characterName: "Keel Lorenz",
    imageUrl: null,
  },
  {
    id: "01JD2WWK29DW0723XJEP7BNSBX",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMCQDZBX6BJ43886BJ",
    media: Media.MOVIE,
    characterName: "Makoto Hyuga",
    imageUrl: null,
  },
  {
    id: "01JD2WWK290W21843SS1R7HT5C",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKM9XAVTH8BB5B4GP9K",
    media: Media.MOVIE,
    characterName: "Maya Ibuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK29MMC1Z5VMDQAWG1GC",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKM6R2GT81R7PKHTA3E",
    media: Media.MOVIE,
    characterName: "Shigeru Aoba",
    imageUrl: null,
  },
  {
    id: "01JD2WWK29KR2ZCX4PQ0D1RXBQ",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKM5QDVXVWZN9T7HS6M",
    media: Media.MOVIE,
    characterName: "Kensuke Aida",
    imageUrl: null,
  },
  {
    id: "01JD2WWK297F9YHR40Z1Z6RS30",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKNEBSGMMFPJFBXXFV4",
    media: Media.MOVIE,
    characterName: "Hikari Horaki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2A4B4M0Z6K1NH4BTZ4",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKMB9XQ7XCP0RFDPCX8",
    media: Media.MOVIE,
    characterName: "Yui Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2AMGJYBP3QWDP2T90G",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
    episodeId: null,
    characterId: "01JBN9BCKN60VAV2T3M5WPK523",
    media: Media.MOVIE,
    characterName: "Pen Pen",
    imageUrl: null,
  },

  // Evangelion: 1.0 You Are (Not) Alone
  {
    id: "01JD0VJQ0D3YKEAMNJ14M4Y18C",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    media: Media.MOVIE,
    characterName: "Gendo Ikari",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0EYYMKBYB3ZYGRM871",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKKWXC05NW6EQRQ42P6",
    media: Media.MOVIE,
    characterName: "Kōzō Fuyutsuki",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0F8XD646XVFY71ZTJG",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    media: Media.MOVIE,
    characterName: "Misato Katsuragi",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0F6R5BW94SBD88R2RF",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKMXRPXDRGEB3407B1D",
    media: Media.MOVIE,
    characterName: "Ritsuko Akagi",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0FK88C196BDP29QC48",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKMAF8R9DMFNRZWYP15",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0FJEC9AEW75K7YZ4WX",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKMCQDZBX6BJ43886BJ",
    media: Media.MOVIE,
    characterName: "Makoto Hyuga",
    imageUrl: null,
  },
  {
    id: "01JD0VJQ0FHXJWM00KAPAM4XS4",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKM6R2GT81R7PKHTA3E",
    media: Media.MOVIE,
    characterName: "Shigeru Aoba",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJ9EZ08A6S0RVPTRKG5",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKM9XAVTH8BB5B4GP9K",
    media: Media.MOVIE,
    characterName: "Maya Ibuki",
    imageUrl: null,
  },
  {
    id: "01JD0TKRVZ6AP851FE3WD2F83J",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    media: Media.MOVIE,
    characterName: "Shinji Ikari",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJASFPM6XKR1AV3JQ5X",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    media: Media.MOVIE,
    characterName: "Rei Ayanami",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJA41MFN3WAKHH66N33",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    media: Media.MOVIE,
    characterName: "Kaworu Nagisa",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJAM07EN7N75SJJBMR3",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKKF2EY0SV7TNWE99S1",
    media: Media.MOVIE,
    characterName: "Tōji Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJANYYA54G4GY23PYXG",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKM5QDVXVWZN9T7HS6M",
    media: Media.MOVIE,
    characterName: "Kensuke Aida",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJAVSJVPHNRYHWE9RFJ",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKNEBSGMMFPJFBXXFV4",
    media: Media.MOVIE,
    characterName: "Hikari Horaki",
    imageUrl: null,
  },
  {
    id: "01JD0VKRJA78A1QE1H6FBD9DFY",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
    episodeId: null,
    characterId: "01JBN9BCKMZPC9APE1N9AYMGJS",
    media: Media.MOVIE,
    characterName: "Keel Lorenz",
    imageUrl: null,
  },

  // Evangelion: 2.0 You Can (Not) Advance
  {
    id: "01JD2WWK1QCQ1557N0RYKW2W09",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    media: Media.MOVIE,
    characterName: "Gendo Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1TVD9AJCWT9DQ8X4FS",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKWXC05NW6EQRQ42P6",
    media: Media.MOVIE,
    characterName: "Kōzō Fuyutsuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1VXWZR908G1PBBDRNA",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    media: Media.MOVIE,
    characterName: "Misato Katsuragi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1VC2SG5D2SRGEDN35R",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKMXRPXDRGEB3407B1D",
    media: Media.MOVIE,
    characterName: "Ritsuko Akagi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1V07DNABR3QRW7BPXA",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKMAF8R9DMFNRZWYP15",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1VXQ8ZR2V0JWP3Y8AA",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKMCQDZBX6BJ43886BJ",
    media: Media.MOVIE,
    characterName: "Makoto Hyuga",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1VJ5CZFPK16103M1N0",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKM6R2GT81R7PKHTA3E",
    media: Media.MOVIE,
    characterName: "Shigeru Aoba",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1VTBK3TFVF3J3WTB3P",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKM9XAVTH8BB5B4GP9K",
    media: Media.MOVIE,
    characterName: "Maya Ibuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1XJ55N2A33HM1BVSZ9",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    media: Media.MOVIE,
    characterName: "Shinji Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1XNP0J43X54T3BMV85",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    media: Media.MOVIE,
    characterName: "Rei Ayanami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1XHEEKYVM5TEBEE0C4",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    media: Media.MOVIE,
    characterName: "Kaworu Nagisa",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1YCF83HJ4K4RWE6QWE",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKDCK57789XDGXJMCX",
    media: Media.MOVIE,
    characterName: "Mari Makinami Illustrious",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1YRPCXQ8VZHAA7P3PP",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKM65D1S0CDV4ARDE2",
    media: Media.MOVIE,
    characterName: "Asuka Shikinami Langley",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1YNX34Q2M0HVVV01C0",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKKF2EY0SV7TNWE99S1",
    media: Media.MOVIE,
    characterName: "Tōji Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1YEM13SZWMZ3T2CXJH",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKM5QDVXVWZN9T7HS6M",
    media: Media.MOVIE,
    characterName: "Kensuke Aida",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1YWV5097XW3CMCVNSA",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKNEBSGMMFPJFBXXFV4",
    media: Media.MOVIE,
    characterName: "Hikari Horaki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1Y1CMDQ3S62EA9P4RG",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
    episodeId: null,
    characterId: "01JBN9BCKMZPC9APE1N9AYMGJS",
    media: Media.MOVIE,
    characterName: "Keel Lorenz",
    imageUrl: null,
  },

  // Evangelion: 3.0 You Can (Not) Redo
  {
    id: "01JD2WWK1Y2VDNBJR7AWFGV2MD",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    media: Media.MOVIE,
    characterName: "Gendo Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1Y01P7BJMSSJHQ2X3X",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKKWXC05NW6EQRQ42P6",
    media: Media.MOVIE,
    characterName: "Kōzō Fuyutsuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1ZBMSC7T1NA64HD4W7",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    media: Media.MOVIE,
    characterName: "Kaworu Nagisa",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1Z0TMH2M05VJ57WP3J",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    media: Media.MOVIE,
    characterName: "Shinji Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1Z7MZTMRHHH9PDB3KZ",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    media: Media.MOVIE,
    characterName: "Rei Ayanami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1ZQA96ZK8VBZMEPM6K",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    media: Media.MOVIE,
    characterName: "Misato Katsuragi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1Z4CX51TFMW4W8BX26",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKMXRPXDRGEB3407B1D",
    media: Media.MOVIE,
    characterName: "Ritsuko Akagi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1ZT0A8VTNXZETEVTD2",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKMAF8R9DMFNRZWYP15",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
  {
    id: "01JD2WWK1ZY2BFD7P63TMF5JK5",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKMCQDZBX6BJ43886BJ",
    media: Media.MOVIE,
    characterName: "Makoto Hyuga",
    imageUrl: null,
  },
  {
    id: "01JD2WWK20TQWES05D4WQ5XXSN",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKM6R2GT81R7PKHTA3E",
    media: Media.MOVIE,
    characterName: "Shigeru Aoba",
    imageUrl: null,
  },
  {
    id: "01JD2WWK20RAAEAVSBS5M88VM0",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKM9XAVTH8BB5B4GP9K",
    media: Media.MOVIE,
    characterName: "Maya Ibuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK208J1B44GYHJ12GMTH",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JD2WWK20VN581YAHAF6GT5GM",
    media: Media.MOVIE,
    characterName: "Koji Takao",
    imageUrl: null,
  },
  {
    id: "01JD2WWK204SZ6TARHHEWRPP6H",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JD2WWK209BFJSSE4MR9YWM8D",
    media: Media.MOVIE,
    characterName: "Sumire Nagara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK21E3K770WK3PYRRYVN",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JD2WWK21XBHE8MQAWQRXCWH0",
    media: Media.MOVIE,
    characterName: "Hideki Tama",
    imageUrl: null,
  },
  {
    id: "01JD2WWK21GFNRM87D3C8RPQBK",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JD2WWK21R7FJB6PEV3322FNR",
    media: Media.MOVIE,
    characterName: "Midori Kitakami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK219D56VAZTH26ZDKXY",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JD2WWK211PXASYZXDYTVN0Z2",
    media: Media.MOVIE,
    characterName: "Sakura Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK215S07X85KM758XVPJ",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKKDCK57789XDGXJMCX",
    media: Media.MOVIE,
    characterName: "Mari Makinami Illustrious",
    imageUrl: null,
  },
  {
    id: "01JD2WWK22C1RFMYRGEX1JWKYW",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
    episodeId: null,
    characterId: "01JBN9BCKKM65D1S0CDV4ARDE2",
    media: Media.MOVIE,
    characterName: "Asuka Shikinami Langley",
    imageUrl: null,
  },

  // Evangelion: 3.0+1.0 Thrice Upon a Time
  {
    id: "01JD2WWK22C3VZZ15ZHAPQ801K",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKHZ3GSCMAD95TMR1M8",
    media: Media.MOVIE,
    characterName: "Shinji Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK22K3FJ9VDHX4MTBKSC",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKDCK57789XDGXJMCX",
    media: Media.MOVIE,
    characterName: "Mari Makinami Illustrious",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2256TEE4TGM4STD72E",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKJ1Y6QGVKH0DFXEPHD",
    media: Media.MOVIE,
    characterName: "Rei Ayanami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK226639M8NMW19P78QN",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKM65D1S0CDV4ARDE2",
    media: Media.MOVIE,
    characterName: "Asuka Shikinami Langley",
    imageUrl: null,
  },
  {
    id: "01JD2WWK22FX1RVVPD1EQEFJS5",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKJK8Z8Y58G3BVYF5G",
    media: Media.MOVIE,
    characterName: "Kaworu Nagisa",
    imageUrl: null,
  },
  {
    id: "01JD2WWK23J5NPNAF764AA1S7Y",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKNC9KYZV9ZNP81EXA",
    media: Media.MOVIE,
    characterName: "Gendo Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK238TJD2Z9E6C2PGTAR",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKWXC05NW6EQRQ42P6",
    media: Media.MOVIE,
    characterName: "Kōzō Fuyutsuki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2480VDR8TJ33543E40",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKMB9XQ7XCP0RFDPCX8",
    media: Media.MOVIE,
    characterName: "Yui Ikari",
    imageUrl: null,
  },
  {
    id: "01JD2WWK24YSZV3YRBP4WX8JNE",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKMCW0TSXK1TZEH4XQP",
    media: Media.MOVIE,
    characterName: "Misato Katsuragi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK25WZ5RJ1Q0TVA1YW44",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKMXRPXDRGEB3407B1D",
    media: Media.MOVIE,
    characterName: "Ritsuko Akagi",
    imageUrl: null,
  },
  {
    id: "01JD2WWK25E149SBFB8NGBTGD7",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKKF2EY0SV7TNWE99S1",
    media: Media.MOVIE,
    characterName: "Tōji Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2595BBMH41ADNTM2N8",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKM5QDVXVWZN9T7HS6M",
    media: Media.MOVIE,
    characterName: "Kensuke Aida",
    imageUrl: null,
  },
  {
    id: "01JD2WWK253JVHTPXBR2NMZXDR",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKNEBSGMMFPJFBXXFV4",
    media: Media.MOVIE,
    characterName: "Hikari Horaki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK25ZRBVSA12DJA8J1GG",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKM6R2GT81R7PKHTA3E",
    media: Media.MOVIE,
    characterName: "Shigeru Aoba",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2572VYKPSCEMEEB4MV",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKMCQDZBX6BJ43886BJ",
    media: Media.MOVIE,
    characterName: "Makoto Hyuga",
    imageUrl: null,
  },
  {
    id: "01JD2WWK25WF0BXZ43WNT0XBTG",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK20VN581YAHAF6GT5GM",
    media: Media.MOVIE,
    characterName: "Koji Takao",
    imageUrl: null,
  },
  {
    id: "01JD2WWK25QQ0VP8MGQ2K2DVEA",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK21R7FJB6PEV3322FNR",
    media: Media.MOVIE,
    characterName: "Midori Kitakami",
    imageUrl: null,
  },
  {
    id: "01JD2WWK26GJB8AT2RM4KKTS00",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK209BFJSSE4MR9YWM8D",
    media: Media.MOVIE,
    characterName: "Sumire Nagara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK26RGYJN2CY7WWECSB4",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK21XBHE8MQAWQRXCWH0",
    media: Media.MOVIE,
    characterName: "Hideki Tama",
    imageUrl: null,
  },
  {
    id: "01JD2WWK26VS2VJJ70QT03ECVB",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK26ARNGE9EDSHGAX525",
    media: Media.MOVIE,
    characterName: "Bunzaemon Horaki",
    imageUrl: null,
  },
  {
    id: "01JD2WWK26641AB08HWRFP3708",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK266ZQJQPRR3XYDXDEF",
    media: Media.MOVIE,
    characterName: "Tsubame Suzuhara",
    imageUrl: null,
  },
  {
    id: "01JD2WWK26513E4VTMFZWFCWV1",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JBN9BCKMAF8R9DMFNRZWYP15",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
  {
    id: "01JD2WWK2722R2VYJDTCBREC2Q",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
    episodeId: null,
    characterId: "01JD2WWK26PJ81NYA7771QA9V2",
    media: Media.MOVIE,
    characterName: "Ryoji Kaji",
    imageUrl: null,
  },
];