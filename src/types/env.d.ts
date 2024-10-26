namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: "development" | "staging" | "production";

    DATABASE_URL: string;
  }
}
