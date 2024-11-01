namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: "development" | "staging" | "production";

    DATABASE_URL: string;

    DO_ACCESS_KEY: string;
    DO_SECRET_KEY: string;
  }
}
