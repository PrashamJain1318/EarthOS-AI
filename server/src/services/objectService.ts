import { objectRepository, PaginationOptions, PaginatedResult } from '../repositories/objectRepository';
import { IObject } from '../models/Object';

export class AppValidationError extends Error {
  statusCode: number;
  code: string;
  constructor(message: string, code = 'VALIDATION_ERROR', statusCode = 400) {
    super(message);
    this.name = 'AppValidationError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const objectService = {
  /**
   * Registers a new resource object.
   */
  async createObject(userId: string, data: Partial<IObject>): Promise<IObject> {
    const objectData = {
      ...data,
      userId: userId as any // force cast to matching mongoose type
    };
    return objectRepository.create(objectData);
  },

  /**
   * Retrieve list of objects for a user.
   */
  async getObjects(userId: string, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    return objectRepository.findAllByUser(userId, options);
  },

  /**
   * Retrieve details of a single object.
   */
  async getObjectById(id: string, userId: string): Promise<IObject> {
    const obj = await objectRepository.findById(id, userId);
    if (!obj) {
      throw new AppValidationError('Object not found or access denied.', 'OBJECT_NOT_FOUND', 404);
    }
    return obj;
  },

  /**
   * Perform a partial update of a resource object.
   */
  async updateObject(id: string, userId: string, data: Partial<IObject>): Promise<IObject> {
    const updated = await objectRepository.update(id, userId, data);
    if (!updated) {
      throw new AppValidationError('Object not found or access denied.', 'OBJECT_NOT_FOUND', 404);
    }
    return updated;
  },

  /**
   * Delete a resource object from tracking.
   */
  async deleteObject(id: string, userId: string): Promise<void> {
    const removed = await objectRepository.remove(id, userId);
    if (!removed) {
      throw new AppValidationError('Object not found or access denied.', 'OBJECT_NOT_FOUND', 404);
    }
  },

  /**
   * Perform text search over objects catalog.
   */
  async searchObjects(userId: string, query: string, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    return objectRepository.search(userId, query, options);
  },

  /**
   * Perform filtering over objects catalog.
   */
  async filterObjects(userId: string, filters: Record<string, any>, options: PaginationOptions): Promise<PaginatedResult<IObject>> {
    return objectRepository.filter(userId, filters, options);
  }
};

export default objectService;
