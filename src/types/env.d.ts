namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: "development" | "staging" | "production";

    DATABASE_URL: string;

    MINIO_ENDPOINT: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
  }
}
