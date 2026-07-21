import { Router } from 'express';
import { passportController } from '../controllers/passportController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

export const passportRouter = Router();

// Public route to retrieve marketplace listings with passports attached
passportRouter.get('/marketplace/listings', passportController.getMarketplaceListings);

// Public route for QR scanner lookup
passportRouter.get('/:passportId', passportController.getByPassportId);

// Protected Repair Partner route to add repair records to the passport
passportRouter.post(
  '/:passportId/repairs',
  authMiddleware,
  authorizeRoles(['REPAIR_PARTNER', 'ADMIN', 'SUPER_ADMIN']),
  passportController.addRepairRecord
);

export default passportRouter;
