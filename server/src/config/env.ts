import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)).default('8000'),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  MONGODB_URI: z.string().url().default('mongodb://127.0.0.1:27017/earthos'),
  REDIS_URI: z.string().url().default('redis://127.0.0.1:6379'),
  JWT_SECRET: z.string().min(8).default('temporary_jwt_secret_key_for_sprint_onboarding')
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables configuration:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
