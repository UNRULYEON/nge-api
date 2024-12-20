import type { PrismaClient } from "@prisma/client";

const directors = async (prisma: PrismaClient) => {
  console.log(`Seeding ${DIRECTORS.length} directors`);

  return await Promise.all(
    DIRECTORS.map(async ({ id, type, personId, episodeId, movieId }) => {
      if (!episodeId && !movieId) {
        throw new Error("episodeId or movieId is required");
      }

      try {
        if (episodeId) {
          return await prisma.director.upsert({
            create: {
              id,
              type,
              person: {
                connect: {
                  id: personId,
                },
              },
              episode: {
                connect: {
                  id: episodeId,
                },
              },
            },
            where: {
              id,
            },
            update: {
              type,
              person: {
                connect: {
                  id: personId,
                },
              },
              episode: {
                connect: {
                  id: episodeId,
                },
              },
            },
          });
        }

        if (movieId) {
          return await prisma.director.upsert({
            create: {
              id,
              type,
              person: {
                connect: {
                  id: personId,
                },
              },
              movie: {
                connect: {
                  id: movieId,
                },
              },
            },
            where: {
              id,
            },
            update: {
              type,
              person: {
                connect: {
                  id: personId,
                },
              },
              movie: {
                connect: {
                  id: movieId,
                },
              },
            },
          });
        }
      } catch (e) {
        console.log("Error creating director");
        console.table({ id, type, personId, episodeId, movieId });
        console.error(e);
      }
    })
  );
};

export { directors };

const DIRECTORS: {
  id: string;
  type: "EPISODE" | "MOVIE";
  personId: string;
  episodeId?: string;
  movieId?: string;
}[] = [
  {
    id: "01JARBZGA1E4BTC6TCACM5204T",
    type: "EPISODE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    episodeId: "01J8TXR9AZ891VF828HE22X5BW",
  },
  {
    id: "01JARBZGA23T1G18ZQ51Y6FP0W",
    type: "EPISODE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    episodeId: "01J8TXR9AZZE4DV6YNSBZZG6FK",
  },
  {
    id: "01JARBZGA2FD0BEB1D4FWAC6HG",
    type: "EPISODE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    episodeId: "01J8TXR9AZ9139190KYWPZ5BEG",
  },
  {
    id: "01JARBZGA2NH5S9YQ5CN4MSPET",
    type: "EPISODE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    episodeId: "01J8TXR9AZKJT36D6RXHDKR3N1",
  },
  {
    id: "01JARBZGA2XTFFDF5FDYG26CPB",
    type: "EPISODE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    episodeId: "01J8TXR9AZ2ZDKYCKN56F4PNER",
  },
  {
    id: "01JARBZGA2415N7F70AWWWPR30",
    type: "EPISODE",
    personId: "01J8WYGT62ARMJC14XREA1GJPH",
    episodeId: "01J8TXR9AZV1AN1VR4MHSFXGT9",
  },
  {
    id: "01JARBZGA2FJ44V5YJ1PTJ99GA",
    type: "EPISODE",
    personId: "01J8WYGT62ARMJC14XREA1GJPH",
    episodeId: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
  },
  {
    id: "01JARBZGA2FGGRTJVA7KVP3ZD6",
    type: "EPISODE",
    personId: "01J8WYGT62ARMJC14XREA1GJPH",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01JARBZGA2ZYJ63516MSB7MY30",
    type: "EPISODE",
    personId: "01J8WYGT62ARMJC14XREA1GJPH",
    episodeId: "01J8TXR9AZTTPYHA8DPTPYPPM8",
  },
  {
    id: "01JARBZGA2AFTKSA0SCMD9YN62",
    type: "EPISODE",
    personId: "01J8WYGT62ARMJC14XREA1GJPH",
    episodeId: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
  },
  {
    id: "01JARBZGA2AKC5614EPC6N3H2K",
    type: "EPISODE",
    personId: "01J8WYGT62J1GDTWV3DSETZQK4",
    episodeId: "01J8TXR9AZDNZN4WF2VAKA8M0D",
  },
  {
    id: "01JARBZGA2Q779G2B532ABFAH3",
    type: "EPISODE",
    personId: "01J8WYGT62J1GDTWV3DSETZQK4",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01JARBZGA2B6MN2FY8RBG3D6G1",
    type: "EPISODE",
    personId: "01J8WYGT62JR5PWH2J9KJ5PJW7",
    episodeId: "01J8TXR9AZH90HX96RYNRRMJQE",
  },
  {
    id: "01JARBZGA2SP9X0VCXSA2P7181",
    type: "EPISODE",
    personId: "01J8WYGT62JR5PWH2J9KJ5PJW7",
    episodeId: "01J8TXR9AZ14NJ5T6N2T3WG94G",
  },
  {
    id: "01JARBZGA26PWZ6WN2QDRZY6J1",
    type: "EPISODE",
    personId: "01J8WYGT62D7Y9EVKNPT392G7V",
    episodeId: "01J8TXR9AZGFHRJPG00VDERG00",
  },
  {
    id: "01JARBZGA2GJ6ZEV1W1FAN4QQ0",
    type: "EPISODE",
    personId: "01J8WYGT62FCB1R75Q2PC10M4S",
    episodeId: "01J8TXR9AZJHR3PSHFTDDDHH9F",
  },
  {
    id: "01JARBZGA2A7WVB0HDA75B7C8X",
    type: "EPISODE",
    personId: "01J8WYGT62EQ96J1JQ7JATW6QX",
    episodeId: "01J8TXR9AZC955C8839VVNX95E",
  },
  {
    id: "01JARBZGA22RGWHS9YPAKYA74C",
    type: "EPISODE",
    personId: "01J8WYGT62EQ96J1JQ7JATW6QX",
    episodeId: "01J8TXR9AZWA9X3STXAKZDR5NX",
  },
  {
    id: "01JARBZGA2WXE5C0TTQNYAD2PZ",
    type: "EPISODE",
    personId: "01J8WYGT62QZ43Z2C47BFP9T51",
    episodeId: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
  },
  {
    id: "01JARBZGA2XKYZY3Z6YR3XZMER",
    type: "EPISODE",
    personId: "01J8WYGT62QZ43Z2C47BFP9T51",
    episodeId: "01J8TXR9AZBAT5XQ36G5YJXPF7",
  },
  {
    id: "01JARBZGA21HDG6HYEKZ8D8A4B",
    type: "EPISODE",
    personId: "01J8WYGT62XT8AT66D0KTRH1XE",
    episodeId: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
  },
  {
    id: "01JARBZGA2Z69DBSXWKKEFRY2J",
    type: "EPISODE",
    personId: "01J8WYGT62N08AHNHCFJ6AFH2J",
    episodeId: "01J8TXR9AZGBX3CG6H651X2MQS",
  },
  {
    id: "01JARBZGA25CSB0VW7NCRR526G",
    type: "EPISODE",
    personId: "01J8WYGT62PQG9335ZNET9GCFM",
    episodeId: "01J8TXR9AZNRYKH51CRZF05TJK",
  },
  {
    id: "01JARBZGA2E21W7RC0DX8NCK38",
    type: "EPISODE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    episodeId: "01J8TXR9AZYRTFXXZTG6W2HSCC",
  },
  {
    id: "01JARBZGA2QM6MZ7C6VAYY19TM",
    type: "EPISODE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    episodeId: "01J8TXR9AZQ8ESPQWE87E7300N",
  },
  {
    id: "01JARBZGA210F6PCS6N23PKTXR",
    type: "EPISODE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    episodeId: "01J8TXR9AZ2ZDKYCKN56F4PNER",
  },
  {
    id: "01JARBZGA2PDR2JDGWQ0R8KZPV",
    type: "EPISODE",
    personId: "01J8WYGT62SMA29E8WYYTK9Z7J",
    episodeId: "01J8TXR9AZQ6HEBS12GMWQJSY4",
  },
  {
    id: "01JARBZGA2PBKYVSYMP7V0X1JS",
    type: "EPISODE",
    personId: "01J8WYGT62XX62G8WRCRQ9MNEG",
    episodeId: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
  },
  {
    id: "01JBWTWMZQ0RX3337TQQZYAF9E",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
  },
  {
    id: "01JBWTWMZSHCY88V3HP3HMYX6Y",
    type: "MOVIE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
  },
  {
    id: "01JBWTWMZS5EDEKMRD45Y8VVNY",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JBWT9VX0VSXDGQ8T1EYBZMCQ",
  },
  {
    id: "01JBWV0M19BX1BPCYT5EBMQHSS",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
  },
  {
    id: "01JBWV0M1APY3500DKE4706CSE",
    type: "MOVIE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
  },
  {
    id: "01JBWV0M1A7ES920ZFF6QQK73R",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JBWT9VX22JY7JA73C5EVWARK",
  },
  {
    id: "01JBWV2YSFBPFRJCMS2JZMXVT0",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
  },
  {
    id: "01JBWV2YSG60A3ARZ6WJDKEWXP",
    type: "MOVIE",
    personId: "01JBWV4JPFMXK7672QHFPMKFH1",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
  },
  {
    id: "01JBWV2YSH1CEQ800F38980Y9V",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
  },
  {
    id: "01JBWV2YSHN26R976WEF90VGYN",
    type: "MOVIE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    movieId: "01JBWT9VX2TY3FJX01A6566RTS",
  },
  {
    id: "01JBWV5NP2C2X662ZR8JZ2TS35",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
  },
  {
    id: "01JBWV5NP3QRSTRKCQ2HEN88BE",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
  },
  {
    id: "01JBWV5NP3W7141MWMBF42A3WN",
    type: "MOVIE",
    personId: "01JBWV4JPFMXK7672QHFPMKFH1",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
  },
  {
    id: "01JBWV5NP3MC5Q4P8VW2KB2SR9",
    type: "MOVIE",
    personId: "01JBWV709M9VMRRJQ9QEGJYVTZ",
    movieId: "01JBWT9VX26DG0XMJFTB86HXRP",
  },
  {
    id: "01JC1JQV5V9KZ79GCKEBMXGYYZ",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
  },
  {
    id: "01JC1JQV5W1ZRTYD4TPQX5X6RT",
    type: "MOVIE",
    personId: "01J8WYGT62V72HXT9P1T7BBEBV",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
  },
  {
    id: "01JC1JQV5WGSTB6TH569N32QVX",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JC1J71A6TDCBKCJ544DQ9WBW",
  },
  {
    id: "01JC1JS62BDPHFMDVGGH1T28V1",
    type: "MOVIE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    movieId: "01JC1J71A772HH3F7PF14Z8DZ8",
  },
  {
    id: "01JC1JS62C44W0HE9TRBA2W4J8",
    type: "MOVIE",
    personId: "01J8WYGT62T9TF4TFNFJTD5QMZ",
    movieId: "01JC1J71A772HH3F7PF14Z8DZ8",
  },
];
