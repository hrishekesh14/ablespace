export interface AppConfig {
  port: number;
  corsOrigin: string;
  databasePath: string;
  jwtSecret: string;
}

export default (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.PORT ?? '3001', 10),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    databasePath: process.env.DATABASE_PATH ?? './data/ablespace.sqlite',
    jwtSecret: process.env.JWT_SECRET ?? 'dev-only-insecure-secret-change-me',
  },
});
