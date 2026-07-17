import mongoose from 'mongoose';
import { createClient } from 'redis';
import { env } from './env';
import { logger } from './logger';

export const redisClient = createClient({
  url: env.REDIS_URI
});

redisClient.on('error', (err) => {
  logger.error(`❌ Redis connection failure: ${err.message}`);
});

redisClient.on('connect', () => {
  logger.info('🚀 Redis caching client connected successfully.');
});

export async function connectDatabases(): Promise<void> {
  try {
    // Connect to MongoDB Atlas / Local
    await mongoose.connect(env.MONGODB_URI);
    logger.info('🚀 MongoDB Database connected successfully.');

    // Connect to Redis Client
    await redisClient.connect();
  } catch (err: any) {
    logger.error(`❌ Database bootstrap failed: ${err.message}`);
    process.exit(1);
  }
}
export default connectDatabases;
