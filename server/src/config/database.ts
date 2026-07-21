import mongoose from 'mongoose';
import { createClient } from 'redis';
import { env } from './env';
import { logger } from './logger';

export const redisClient = createClient({
  url: env.REDIS_URI,
  socket: {
    reconnectStrategy: (retries) => {
      // limit reconnection attempts to 3 times to prevent log flooding
      if (retries > 3) {
        logger.warn('⚠️ Redis reconnection attempts exhausted. Operating without cache.');
        return false; // stops reconnecting
      }
      return 1000; // retry after 1s
    }
  }
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
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unreachable
    });
    logger.info('🚀 MongoDB Database connected successfully.');
  } catch (err: any) {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  try {
    // Connect to Redis Client
    await redisClient.connect();
  } catch (err: any) {
    logger.error(`❌ Redis connection failed: ${err.message}`);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}
export default connectDatabases;
