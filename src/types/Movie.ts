export type Movie = {
  id: string;
  title: {
    english: string;
    japanese: string;
    japaneseLiteral: string | null;
    romaji: string;
  };
  imageUrl: string | null;
  runTimeInMinutes: number;
};
