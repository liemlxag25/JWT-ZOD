// src/configs/config.ts
import dotenv from 'dotenv';
import { hostname } from 'os';
dotenv.config();

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    hostname: process.env.DEV_HOST_NAME || "localhost",
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'dev_db',
  },
  // Trong config.ts (chỉ phần jwt)
  jwt: {
    secret: process.env.DEV_JWT_SECRET || 'dev_fallback_secret_key_12345',
    expiresIn: process.env.DEV_JWT_EXPIRES_IN || '7 days',
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 8000,
    hostname: process.env.PRO_HOST_NAME || "localhost",
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'pro_db',
  },
  // Trong config.ts (chỉ phần jwt)
  jwt: {
    secret: process.env.PRO_JWT_SECRET || 'dev_fallback_secret_key_12345',
    expiresIn: process.env.PRO_JWT_EXPIRES_IN || '5h',
  },
};

const config = { dev, pro };
type EnvType = keyof typeof config; // "dev" | "pro"
const env: EnvType = process.env.NODE_ENV === "production" ? "pro" : "dev";
export default config[env];