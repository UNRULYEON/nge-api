declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OTEL_EXPORTER_OTLP_ENDPOINT: string;
    SIGNOZ_INGESTION_KEY: string;
  }
}
