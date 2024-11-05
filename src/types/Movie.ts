export type Movie = {
  id: string;
  title: {
    english: string;
    japanese: string;
    japaneseLiteral: string;
    romaji: string;
  };
  runTimeInMinutes: number;
};
