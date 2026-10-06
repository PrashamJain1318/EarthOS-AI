import { Request, Response } from 'express';
import { taxonomyService } from '../services/taxonomyService';

export const taxonomyController = {
  // ─── Categories ─────────────────────────────────────────

  getCategories: async (req: Request, res: Response) => {
    try {
      const { q, parentId } = req.query;
      
      const categories = await taxonomyService.getCategories(
        q as string, 
        parentId as string
      );

      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch categories.' } });
    }
  },

  // ─── Tags ───────────────────────────────────────────────

  getPopularTags: async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const tags = await taxonomyService.getPopularTags(limit);

      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error('Error fetching popular tags:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch popular tags.' } });
    }
  },

  searchTags: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      const tags = await taxonomyService.searchTags(q as string);

      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error('Error searching tags:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to search tags.' } });
    }
  }
};
