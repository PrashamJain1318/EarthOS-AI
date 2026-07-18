import { Router } from 'express';
import { objectController } from '../controllers/objectController';
import { authMiddleware } from '../middlewares/auth';

export const objectsRouter = Router();

// Protect all resource object endpoints
objectsRouter.use(authMiddleware);

// Core CRUD APIs
objectsRouter.post('/', objectController.create);
objectsRouter.get('/', objectController.getAll);

// Dynamic Queries (placed before parameterized ID matches)
objectsRouter.get('/search', objectController.search);
objectsRouter.get('/filter', objectController.filter);

// Specific Object Parameter matches
objectsRouter.get('/:id', objectController.getById);
objectsRouter.put('/:id', objectController.update);
objectsRouter.delete('/:id', objectController.remove);

export default objectsRouter;
