import { prisma } from "@/db/client.ts";

const writers = async () => {
  return await Promise.all(
    NGE.map(({ id, type, personId, episodeId }) => {
      return prisma.writer.upsert({
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
    }),
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
    id: "01J8TXR9AZ891VF828HE22X5BW",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ891VF828HE22X5BW",
  },
  {
    id: "01J8TXR9AZXGY9VWC2WPBDTX13",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZXGY9VWC2WPBDTX13",
  },
  {
    id: "01J8TXR9AZV1AN1VR4MHSFXGT9",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZV1AN1VR4MHSFXGT9",
  },
  {
    id: "01J8TXR9AZH90HX96RYNRRMJQE",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZH90HX96RYNRRMJQE",
  },
  {
    id: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
  },
  {
    id: "01J8TXR9AZ14NJ5T6N2T3WG94G",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ14NJ5T6N2T3WG94G",
  },
  {
    id: "01J8TXR9AZZE4DV6YNSBZZG6FK",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZZE4DV6YNSBZZG6FK",
  },
  {
    id: "01J8TXR9AZGFHRJPG00VDERG00",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZGFHRJPG00VDERG00",
  },
  {
    id: "01J8TXR9AZ097D1QEJZYECHR5B",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01J8TXR9AZJHR3PSHFTDDDHH9F",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZJHR3PSHFTDDDHH9F",
  },
  {
    id: "01J8TXR9AZTTPYHA8DPTPYPPM8",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZTTPYHA8DPTPYPPM8",
  },
  {
    id: "01J8TXR9AZC955C8839VVNX95E",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZC955C8839VVNX95E",
  },
  {
    id: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZRHBRHEYFT4VZ6JH2",
  },
  {
    id: "01J8TXR9AZGBX3CG6H651X2MQS",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZGBX3CG6H651X2MQS",
  },
  {
    id: "01J8TXR9AZ9139190KYWPZ5BEG",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ9139190KYWPZ5BEG",
  },
  {
    id: "01J8TXR9AZNRYKH51CRZF05TJK",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZNRYKH51CRZF05TJK",
  },
  {
    id: "01J8TXR9AZWA9X3STXAKZDR5NX",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZWA9X3STXAKZDR5NX",
  },
  {
    id: "01J8TXR9AZYRTFXXZTG6W2HSCC",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZYRTFXXZTG6W2HSCC",
  },
  {
    id: "01J8TXR9AZBAT5XQ36G5YJXPF7",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZBAT5XQ36G5YJXPF7",
  },
  {
    id: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
  },
  {
    id: "01J8TXR9AZQ6HEBS12GMWQJSY4",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZQ6HEBS12GMWQJSY4",
  },
  {
    id: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
  },
  {
    id: "01J8TXR9AZQ8ESPQWE87E7300N",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZQ8ESPQWE87E7300N",
  },
  {
    id: "01J8TXR9AZKJT36D6RXHDKR3N1",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZKJT36D6RXHDKR3N1",
  },
  {
    id: "01J8TXR9AZ2ZDKYCKN56F4PNER",
    type: "EPISODE",
    personId: "01J8WYGT621JTJRF0TZYZY8EFP",
    episodeId: "01J8TXR9AZ2ZDKYCKN56F4PNER",
  },
  {
    id: "01J8TXR9AZXGY9VWC2WPBDTX13",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZXGY9VWC2WPBDTX13",
  },
  {
    id: "01J8TXR9AZ14NJ5T6N2T3WG94G",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZ14NJ5T6N2T3WG94G",
  },
  {
    id: "01J8TXR9AZZE4DV6YNSBZZG6FK",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZZE4DV6YNSBZZG6FK",
  },
  {
    id: "01J8TXR9AZJHR3PSHFTDDDHH9F",
    type: "EPISODE",
    personId: "01J8WYGT62V4ACD7086HWEFP93",
    episodeId: "01J8TXR9AZJHR3PSHFTDDDHH9F",
  },
  {
    id: "01J8TXR9AZV1AN1VR4MHSFXGT9",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZV1AN1VR4MHSFXGT9",
  },
  {
    id: "01J8TXR9AZDNZN4WF2VAKA8M0D",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZDNZN4WF2VAKA8M0D",
  },
  {
    id: "01J8TXR9AZH90HX96RYNRRMJQE",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZH90HX96RYNRRMJQE",
  },
  {
    id: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ8XC86S9Z15ZE8M6H",
  },
  {
    id: "01J8TXR9AZGFHRJPG00VDERG00",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZGFHRJPG00VDERG00",
  },
  {
    id: "01J8TXR9AZ097D1QEJZYECHR5B",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ097D1QEJZYECHR5B",
  },
  {
    id: "01J8TXR9AZTTPYHA8DPTPYPPM8",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZTTPYHA8DPTPYPPM8",
  },
  {
    id: "01J8TXR9AZGBX3CG6H651X2MQS",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZGBX3CG6H651X2MQS",
  },
  {
    id: "01J8TXR9AZYRTFXXZTG6W2HSCC",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZYRTFXXZTG6W2HSCC",
  },
  {
    id: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZ7F9MT0HK1ZJDW6BP",
  },
  {
    id: "01J8TXR9AZQ8ESPQWE87E7300N",
    type: "EPISODE",
    personId: "01J8WYGT62PBVV5CSTGBXBAGPA",
    episodeId: "01J8TXR9AZQ8ESPQWE87E7300N",
  },
  {
    id: "01J8TXR9AZC955C8839VVNX95E",
    type: "EPISODE",
    personId: "01J8WYGT62TM0414NZPV4HV0J0",
    episodeId: "01J8TXR9AZC955C8839VVNX95E",
  },
  {
    id: "01J8TXR9AZQ6HEBS12GMWQJSY4",
    type: "EPISODE",
    personId: "01J8WYGT62KZJXAFNZCFRB0RDF",
    episodeId: "01J8TXR9AZQ6HEBS12GMWQJSY4",
  },
  {
    id: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
    type: "EPISODE",
    personId: "01J8WYGT62KZJXAFNZCFRB0RDF",
    episodeId: "01J8TXR9AZ7B3XR4XTQHNTPGMP",
  },
];
