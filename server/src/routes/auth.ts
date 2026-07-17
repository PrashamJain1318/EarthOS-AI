import { Router, Request, Response } from 'express';
import { logger } from '../config/logger';

export const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  logger.info('🔑 Register signup request received.');
  res.status(201).json({
    success: true,
    data: {
      message: 'Authentication signup placeholder registered successfully.'
    }
  });
});

authRouter.post('/login', (req: Request, res: Response) => {
  logger.info('🔑 Login authentication request received.');
  res.status(200).json({
    success: true,
    data: {
      token: 'jwt_token_placeholder_for_earthos_foundation_sprint'
    }
  });
});

authRouter.get('/session', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: 'user_placeholder_123',
        email: 'placeholder@earthos.ai',
        role: 'USER'
      }
    }
  });
});

export default authRouter;
