import type { PrismaClient } from "@prisma/client";

const writers = async (prisma: PrismaClient) => {
  return await Promise.all(
    NGE.map(async ({ id, type, personId, episodeId }) => {
      return await prisma.writer.upsert({
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
    })
  );
};

export { writers };

const NGE: {
  id: string;
  type: "EPISODE";
  personId: string;
  episodeId: string;
}[] = [
  {
    id: "01JAV26GX3BKR63TDSNWTY4C63",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ891VF828HE22X5BW",
  },
  {
    id: "01JAV26GX3K4NTXC9G2SBD8YHS",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZXGY9VWC2WPBDTX13",
  },
  {
    id: "01JAV26GX4J56BMEDGSNHXDZYB",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZXGY9VWC2WPBDTX13",
  },
  {
    id: "01JAV26GX48AW57YNKW03C8VND",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZV1AN1VR4MHSFXGT9",
  },
  {
    id: "01JAV26GX4Y4E8NFW7KPW4QQMV",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZV1AN1VR4MHSFXGT9",
  },
  {
    id: "01JAV26GX4Y4E8NFW7KPW4QQMV",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZDNZN4WF2VAKA8M0D",
  },
  {
    id: "01JAV26GX46TFJFRBMGT0B9325",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZH90HX96RYNRRMJQE",
  },
  {
    id: "01JAV26GX4F9ZBMNYTH6N5F991",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZH90HX96RYNRRMJQE",
  },
  {
    id: "01JAV26GX439EYTYP7C9F5ZZF4",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
  },
  {
    id: "01JAV26GX43C16XA7EGQS67RTA",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
  },
  {
    id: "01JAV26GX4CTJY55GPNTVY3E9N",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ14NJ5T6N2T3WG94G",
  },
  {
    id: "01JAV26GX484X38YYSP6WSNC9G",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZ14NJ5T6N2T3WG94G",
  },
  {
    id: "01JAV26GX49V7EW9FEBWRMWR7N",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZZE4DV6YNSBZZG6FK",
  },
  {
    id: "01JAV26GX4Q6QYRYEBPX7DNG4B",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZZE4DV6YNSBZZG6FK",
  },
  {
    id: "01JAV26GX4MMCFEP8GPY00101M",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZGFHRJPG00VDERG00",
  },
  {
    id: "01JAV26GX4TYHFMA0G3SXG2YMM",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZGFHRJPG00VDERG00",
  },
  {
    id: "01JAV26GX4QT1C4NARZFQ698A2",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01JAV26GX4ZW1PHXVWWE6GW2G7",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01JAV26GX40NZMXF9JRXP87WTP",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZJHR3PSHFTDDDHH9F",
  },
  {
    id: "01JAV26GX48H02TZZCPS1Y2H72",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZJHR3PSHFTDDDHH9F",
  },
  {
    id: "01JAV26GX4F6FG9KN0HNQKJP4V",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZTTPYHA8DPTPYPPM8",
  },
  {
    id: "01JAV26GX4BFERKEG1S2F4VCGM",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZTTPYHA8DPTPYPPM8",
  },
  {
    id: "01JAV26GX4Z8FSSENQE0EVNFS3",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZC955C8839VVNX95E",
  },
  {
    id: "01JAV26GX4PW4ACMERYSQ53YR3",
    type: "EPISODE",
    personId: "01J8WYGT62TM0414NZPV4HV0J0",
    episodeId: "01J8TXR9AZC955C8839VVNX95E",
  },
  {
    id: "01JAV26GX490NJPXRX6BDRS35Y",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
  },
  {
    id: "01JAV26GX4HQ0XWV82B1RABCH2",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZGBX3CG6H651X2MQS",
  },
  {
    id: "01JAV26GX43DPJB9XV2HDQVN47",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZGBX3CG6H651X2MQS",
  },
  {
    id: "01JAV26GX4P2C3DAMKSCT99SKP",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ9139190KYWPZ5BEG",
  },
  {
    id: "01JAV26GX4MFVZVMQT0TZJ764R",
    type: "EPISODE",
    personId: "01J8WYGT62KZJXAFNZCFRB0RDF",
    episodeId: "01J8TXR9AZ9139190KYWPZ5BEG",
  },
  {
    id: "01JAV26GX431FVWY8AQJTZ86YM",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZNRYKH51CRZF05TJK",
  },
  {
    id: "01JAV26GX4R0AVK1D8YJ6X85H0",
    type: "EPISODE",
    personId: "01JAV26GX4333HXTQK3GHSBY9G",
    episodeId: "01J8TXR9AZNRYKH51CRZF05TJK",
  },
  {
    id: "01JAV26GX4J4D32WJBP7N02CS6",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZWA9X3STXAKZDR5NX",
  },
  {
    id: "01JAV26GX4BHS84C6H7AYB5429",
    type: "EPISODE",
    personId: "01JAV26GX4333HXTQK3GHSBY9G",
    episodeId: "01J8TXR9AZWA9X3STXAKZDR5NX",
  },
  {
    id: "01JAV26GX4A9Y2EM0N3J4T40J7",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZYRTFXXZTG6W2HSCC",
  },
  {
    id: "01JAV26GX4BWYW41ACQ8ZEKJ2Z",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZYRTFXXZTG6W2HSCC",
  },
  {
    id: "01JAV26GX4FQZTC98MQESM9NKQ",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZBAT5XQ36G5YJXPF7",
  },
  {
    id: "01JAV26GX499NMKSBAKCF4S82S",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
  },
  {
    id: "01JAV26GX4BZQ29HE2VGRH740H",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
  },
  {
    id: "01JAV26GX4CRG9037NQ1A9WKKK",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZQ6HEBS12GMWQJSY4",
  },
  {
    id: "01JAV26GX4YJS09SM8GE8F2F93",
    type: "EPISODE",
    personId: "01J8WYGT62KZJXAFNZCFRB0RDF",
    episodeId: "01J8TXR9AZQ6HEBS12GMWQJSY4",
  },
  {
    id: "01JAV26GX4YJEAJS2VDH7HVNT3",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
  },
  {
    id: "01JAV26GX4KMFXEPWA6T62W7JF",
    type: "EPISODE",
    personId: "01J8WYGT62KZJXAFNZCFRB0RDF",
    episodeId: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
  },
  {
    id: "01JAV26GX4QQFP2QPTAB66JG97",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZQ8ESPQWE87E7300N",
  },
  {
    id: "01JAV26GX46DEW5DV2B4W281J1",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZQ8ESPQWE87E7300N",
  },
  {
    id: "01JAV26GX458YGSND7F9456D3H",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZKJT36D6RXHDKR3N1",
  },
  {
    id: "01JAV26GX43CJZMPRZXFTMDQKX",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ2ZDKYCKN56F4PNER",
  },
];
