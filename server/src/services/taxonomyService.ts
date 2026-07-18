import { TagModel } from '../models/Tag';
import { CategoryModel } from '../models/Category';

export const taxonomyService = {
  processTags: async (tagNames: string[]) => {
    if (!tagNames || tagNames.length === 0) return [];

    const processedTags = [];
    for (const name of tagNames) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      if (!slug) continue;

      const tag = await TagModel.findOneAndUpdate(
        { slug },
        { 
          $set: { name: name.toUpperCase() },
          $inc: { usageCount: 1 },
          $currentDate: { lastUsedAt: true }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      processedTags.push(tag.name);
    }
    return processedTags;
  },

  processCategory: async (categoryName: string, subCategoryName?: string) => {
    let parentId = null;

    if (categoryName) {
      const catSlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const cat = await CategoryModel.findOneAndUpdate(
        { slug: catSlug, parentId: null },
        { 
          $set: { name: categoryName.toUpperCase() },
          $inc: { usageCount: 1 }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      parentId = cat._id;
    }

    if (subCategoryName && parentId) {
      const subSlug = subCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await CategoryModel.findOneAndUpdate(
        { slug: subSlug, parentId },
        { 
          $set: { name: subCategoryName.toUpperCase() },
          $inc: { usageCount: 1 }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  }
};
