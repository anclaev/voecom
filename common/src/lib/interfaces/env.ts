export interface ENV {
  DATABASE_URL: string;
  API_PORT: string;
  ALLOWED_ORIGINS: string;
  COOKIE_SECRET: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  MAX_SESSIONS: number;
  SESSION_EXPIRATION: number;
  JWT_EXPIRATION: number;
  JWT_REFRESH_EXPIRATION: number;
  RABBITMQ_URL: string;
}
