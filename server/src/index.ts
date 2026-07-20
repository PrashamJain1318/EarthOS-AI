import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectDatabases } from './config/db';
import { globalErrorHandler } from './middlewares/errors';
import authRoutes from './routes/auth';
import objectRoutes from './routes/objects';
import taxonomyRoutes from './routes/taxonomy';
import scannerRoutes from './routes/scanner';
import passportRoutes from './routes/passport';

const app = express();

// Secure Server Headers setup
app.use(helmet());

// Cross-origin Resource Sharing configuration
app.use(cors({
  origin: '*', // Allow all client queries during initial foundation sprint
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
}));

// Body parsing parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global IP Rate Limiter configuration
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Limit each IP address to 100 API queries per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Rate limit exceeded. Please wait a few moments before trying again.'
    }
  }
});
app.use('/api/', rateLimiter);

// Health check hook
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      uptime: process.uptime()
    }
  });
});

// App Router mount registries
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/objects', objectRoutes);
app.use('/api/v1/taxonomy', taxonomyRoutes);
app.use('/api/v1/scanner', scannerRoutes);
app.use('/api/v1/passports', passportRoutes);

// Global Error Interceptor middleware
app.use(globalErrorHandler);

async function startServer() {
  logger.info('⏳ Initializing database connection hooks...');
  // Connect to databases
  await connectDatabases();

  app.listen(env.PORT, () => {
    logger.info(`🚀 EARTHOS AI Server started successfully on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

startServer().catch((err) => {
  logger.error(`❌ Server crash on launch: ${err.message}`);
});
export default app;
