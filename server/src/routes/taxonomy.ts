import { Router } from 'express';
import { taxonomyController } from '../controllers/taxonomyController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Protect taxonomy routes to prevent abuse, although they are read-only mostly
router.use(authMiddleware);

router.get('/categories', taxonomyController.getCategories);
router.get('/tags/popular', taxonomyController.getPopularTags);
router.get('/tags/search', taxonomyController.searchTags);

export default router;
