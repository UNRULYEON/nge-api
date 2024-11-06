export type Movie = {
  id: string;
  title: {
    english: string;
    japanese: string;
    japaneseLiteral: string;
    romaji: string;
  };
  imageUrl: string | null;
  runTimeInMinutes: number;
};
