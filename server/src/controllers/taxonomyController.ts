import { Request, Response } from 'express';
import { CategoryModel } from '../models/Category';
import { TagModel } from '../models/Tag';

export const taxonomyController = {
  // ─── Categories ─────────────────────────────────────────

  getCategories: async (req: Request, res: Response) => {
    try {
      const { q, parentId } = req.query;
      const query: any = { isActive: true };

      if (q) {
        query.name = { $regex: q as string, $options: 'i' };
      }

      if (parentId !== undefined) {
        query.parentId = parentId === 'null' ? null : parentId;
      }

      const categories = await CategoryModel.find(query)
        .sort({ usageCount: -1, name: 1 })
        .limit(50);

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
      const tags = await TagModel.find()
        .sort({ usageCount: -1, lastUsedAt: -1 })
        .limit(limit);

      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error('Error fetching popular tags:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch popular tags.' } });
    }
  },

  searchTags: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(200).json({ success: true, data: [] });
      }

      const tags = await TagModel.find({
        name: { $regex: `^${q}`, $options: 'i' }
      })
      .sort({ usageCount: -1 })
      .limit(10);

      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error('Error searching tags:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to search tags.' } });
    }
  },

  // Helper method used internally by ObjectController to process custom tags
  processTags: async (tagNames: string[]) => {
    if (!tagNames || tagNames.length === 0) return [];

    const processedTags = [];
    for (const name of tagNames) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      if (!slug) continue;

      const tag = await TagModel.findOneAndUpdate(
        { slug },
        { 
          $set: { name: name.toUpperCase() }, // Standardize to uppercase display
          $inc: { usageCount: 1 },
          $currentDate: { lastUsedAt: true }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      processedTags.push(tag.name);
    }
    return processedTags;
  }
};
