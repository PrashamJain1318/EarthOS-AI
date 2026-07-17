import { Router, Request, Response } from 'express';
import { logger } from '../config/logger';

export const objectsRouter = Router();

objectsRouter.get('/', (req: Request, res: Response) => {
  logger.info('📦 Query registered material objects catalog list.');
  res.status(200).json({
    success: true,
    data: {
      objects: []
    }
  });
});

objectsRouter.post('/', (req: Request, res: Response) => {
  logger.info('📦 Registering new physical object batch stream.');
  res.status(201).json({
    success: true,
    data: {
      id: 'object_registered_uuid_placeholder',
      status: 'REGISTERED'
    }
  });
});

export default objectsRouter;
