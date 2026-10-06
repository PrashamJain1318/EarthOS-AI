import { Router } from 'express';
import { scannerController } from '../controllers/scannerController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

export const scannerRouter = Router();

// Protect all scanner endpoints
scannerRouter.use(authMiddleware);

// Scan endpoint
scannerRouter.post('/scan', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), scannerController.scan);

// History operations
scannerRouter.get('/history', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), scannerController.getHistory);
scannerRouter.delete('/history/:id', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), scannerController.deleteItem);
scannerRouter.delete('/history', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), scannerController.clearHistory);

export default scannerRouter;
