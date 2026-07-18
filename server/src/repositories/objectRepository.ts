import { ObjectModel, IObject } from '../models/Object';
import { FilterQuery, SortOrder } from 'mongoose';

// ─── Interfaces ──────────────────────────────────────────

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ─── Repository ──────────────────────────────────────────

export const objectRepository = {

  /**
   * Create a new object document.
   */
  async create(data: Partial<IObject>): Promise<IObject> {
    const obj = new ObjectModel(data);
    return obj.save();
  },

  /**
   * Find a single object by its MongoDB _id, scoped to a user.
   */
  async findById(id: string, userId: string): Promise<IObject | null> {
    return ObjectModel.findOne({ _id: id, userId });
  },

  /**
   * Find all objects for a user with pagination and sorting.
   */
  async findAllByUser(userId: string, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    const { page, limit, sortBy, sortOrder } = options;
    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      ObjectModel.find({ userId, archived: false })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean<IObject[]>(),
      ObjectModel.countDocuments({ userId, archived: false })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  },

  /**
   * Partial update an object by its MongoDB _id, scoped to a user.
   */
  async update(id: string, userId: string, data: Partial<IObject>): Promise<IObject | null> {
    return ObjectModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true, runValidators: true }
    );
  },

  /**
   * Hard delete an object by its MongoDB _id, scoped to a user.
   */
  async remove(id: string, userId: string): Promise<IObject | null> {
    return ObjectModel.findOneAndDelete({ _id: id, userId });
  },

  /**
   * Full-text search across objectName, description, brand, tags.
   */
  async search(userId: string, query: string, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    const { page, limit, sortBy, sortOrder } = options;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<IObject> = {
      userId,
      archived: false,
      $text: { $search: query }
    };

    const sort: Record<string, SortOrder> = sortBy === 'relevance'
      ? { score: { $meta: 'textScore' } as any }
      : { [sortBy]: sortOrder };

    const projection = sortBy === 'relevance'
      ? { score: { $meta: 'textScore' } }
      : {};

    const [data, total] = await Promise.all([
      ObjectModel.find(filter, projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean<IObject[]>(),
      ObjectModel.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  },

  /**
   * Multi-field filtering with pagination.
   */
  async filter(userId: string, filters: Record<string, any>, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    const { page, limit, sortBy, sortOrder } = options;
    const skip = (page - 1) * limit;
    let sort: Record<string, SortOrder> = { [sortBy]: sortOrder };

    // Build dynamic Mongo query from filter params
    const query: FilterQuery<IObject> = { userId, archived: false };

    if (filters.q) {
      query.$text = { $search: filters.q };
      // Override sort to relevance if sorting by default (createdAt)
      if (sortBy === 'createdAt') {
        sort = { score: { $meta: 'textScore' } as any };
      }
    }

    if (filters.category)          query.category = filters.category;
    if (filters.condition)         query.condition = filters.condition;
    if (filters.lifecycleStage)    query.lifecycleStage = filters.lifecycleStage;
    if (filters.donationStatus)    query.donationStatus = filters.donationStatus;
    if (filters.marketplaceStatus) query.marketplaceStatus = filters.marketplaceStatus;
    if (filters.archived !== undefined) query.archived = filters.archived;

    // String Regex Matching
    if (filters.name)         query.objectName = { $regex: filters.name, $options: 'i' };
    if (filters.brand)        query.brand = { $regex: filters.brand, $options: 'i' };
    if (filters.model)        query.model = { $regex: filters.model, $options: 'i' };
    if (filters.serialNumber) query.serialNumber = { $regex: filters.serialNumber, $options: 'i' };
    
    // Location Search (matches city or country)
    if (filters.location) {
      query.$or = [
        { 'location.city': { $regex: filters.location, $options: 'i' } },
        { 'location.country': { $regex: filters.location, $options: 'i' } },
        { 'location.state': { $regex: filters.location, $options: 'i' } }
      ];
    }

    // Date Ranges
    if (filters.minPurchaseDate || filters.maxPurchaseDate) {
      query.purchaseDate = {};
      if (filters.minPurchaseDate) query.purchaseDate.$gte = new Date(filters.minPurchaseDate);
      if (filters.maxPurchaseDate) query.purchaseDate.$lte = new Date(filters.maxPurchaseDate);
    }

    // Warranty
    if (filters.hasWarranty !== undefined) {
      if (filters.hasWarranty) {
        query.warrantyExpiry = { $gt: new Date() };
      } else {
        query.$or = [
          { warrantyExpiry: { $exists: false } },
          { warrantyExpiry: null },
          { warrantyExpiry: { $lte: new Date() } }
        ];
      }
    }

    // Price range
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.purchasePrice = {};
      if (filters.minPrice !== undefined) query.purchasePrice.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.purchasePrice.$lte = filters.maxPrice;
    }

    // AI Score range
    if (filters.minAiScore !== undefined || filters.maxAiScore !== undefined) {
      query.aiScore = {};
      if (filters.minAiScore !== undefined) query.aiScore.$gte = filters.minAiScore;
      if (filters.maxAiScore !== undefined) query.aiScore.$lte = filters.maxAiScore;
    }

    // Carbon Score range
    if (filters.minCarbonScore !== undefined || filters.maxCarbonScore !== undefined) {
      query.carbonScore = {};
      if (filters.minCarbonScore !== undefined) query.carbonScore.$gte = filters.minCarbonScore;
      if (filters.maxCarbonScore !== undefined) query.carbonScore.$lte = filters.maxCarbonScore;
    }

    // Tags filter (match any)
    if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    const projection = query.$text && (!options.sortBy || options.sortBy === 'createdAt')
      ? { score: { $meta: 'textScore' } }
      : {};

    const [data, total] = await Promise.all([
      ObjectModel.find(query, projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean<IObject[]>(),
      ObjectModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  },

  /**
   * Count documents matching a filter for a user.
   */
  async count(userId: string, filters: FilterQuery<IObject> = {}): Promise<number> {
    return ObjectModel.countDocuments({ userId, ...filters });
  }
};

export default objectRepository;
