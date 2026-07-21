import { Request, Response, NextFunction } from 'express';
import { objectService } from '../services/objectService';
import { 
  createObjectSchema, 
  updateObjectSchema, 
  paginationSchema, 
  searchSchema, 
  filterSchema 
} from '../validators/objectValidation';
import { logger } from '../config/logger';

export const objectController = {
  /**
   * POST /api/v1/objects
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const validated = createObjectSchema.parse(req.body);
      const obj = await objectService.createObject(userId, validated as any);

      logger.info(`📦 Object registered: ${obj.objectId} for user ${userId}`);
      res.status(201).json({
        success: true,
        data: obj
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/objects
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const paginationOptions = paginationSchema.parse({
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder
      });

      const result = await objectService.getObjects(userId, paginationOptions);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/objects/all
   * Unpaginated list for Analytics Dashboard
   */
  async getAllUnpaginated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const objects = await objectService.getAllUnpaginated(userId);
      res.status(200).json({
        success: true,
        data: objects
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/objects/search
   */
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const searchInput = searchSchema.parse({ q: req.query.q });
      const paginationOptions = paginationSchema.parse({
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy || 'relevance',
        sortOrder: req.query.sortOrder
      });

      const result = await objectService.searchObjects(userId, searchInput.q, paginationOptions);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/objects/filter
   */
  async filter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      // Collect potential filter values from query parameters
      const filterInput = filterSchema.parse({
        q: req.query.q,
        name: req.query.name,
        brand: req.query.brand,
        model: req.query.model,
        serialNumber: req.query.serialNumber,
        location: req.query.location,
        category: req.query.category,
        condition: req.query.condition,
        lifecycleStage: req.query.lifecycleStage,
        donationStatus: req.query.donationStatus,
        marketplaceStatus: req.query.marketplaceStatus,
        hasWarranty: req.query.hasWarranty,
        minPurchaseDate: req.query.minPurchaseDate,
        maxPurchaseDate: req.query.maxPurchaseDate,
        archived: req.query.archived,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        minAiScore: req.query.minAiScore,
        maxAiScore: req.query.maxAiScore,
        minCarbonScore: req.query.minCarbonScore,
        maxCarbonScore: req.query.maxCarbonScore,
        tags: req.query.tags
      });

      const paginationOptions = paginationSchema.parse({
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder
      });

      const result = await objectService.filterObjects(userId, filterInput, paginationOptions);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/objects/:id
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const { id } = req.params;
      const obj = await objectService.getObjectById(id, userId);
      res.status(200).json({
        success: true,
        data: obj
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * PUT /api/v1/objects/:id
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const { id } = req.params;
      const validated = updateObjectSchema.parse(req.body);
      const updated = await objectService.updateObject(id, userId, validated as any);

      logger.info(`📦 Object updated: ${updated.objectId} for user ${userId}`);
      res.status(200).json({
        success: true,
        data: updated
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/v1/objects/:id
   */
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const { id } = req.params;
      await objectService.deleteObject(id, userId);

      logger.info(`📦 Object removed: ${id} for user ${userId}`);
      res.status(200).json({
        success: true,
        data: { message: 'Object deleted successfully.' }
      });
    } catch (err) {
      next(err);
    }
  }
};

export default objectController;
