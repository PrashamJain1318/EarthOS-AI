import { Router } from 'express';
import { passportController } from '../controllers/passportController';

export const passportRouter = Router();

// Public route for QR scanner lookup
passportRouter.get('/:passportId', passportController.getByPassportId);

export default passportRouter;
