import { Router } from 'express';
import { objectController } from '../controllers/objectController';
import { authMiddleware, authorizeRoles } from '../middlewares/auth';

export const objectsRouter = Router();

// Protect all resource object endpoints
objectsRouter.use(authMiddleware);

// Core CRUD APIs - Allow standard roles to access objects
objectsRouter.post('/', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.create);
objectsRouter.get('/', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.getAll);

// Dynamic Queries (placed before parameterized ID matches)
objectsRouter.get('/search', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.search);
objectsRouter.get('/filter', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.filter);

// Specific Object Parameter matches
objectsRouter.get('/:id', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.getById);
objectsRouter.put('/:id', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.update);
objectsRouter.delete('/:id', authorizeRoles(['USER', 'NGO', 'REPAIR_PARTNER', 'RECYCLER', 'SELLER', 'ENTERPRISE', 'GOVERNMENT', 'ADMIN', 'SUPER_ADMIN']), objectController.remove);

export default objectsRouter;
