import { Request, Response, NextFunction } from 'express';
import { passportService, PassportError } from '../services/passportService';
import { logger } from '../config/logger';

export const passportController = {
  async getByPassportId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { passportId } = req.params;

      if (!passportId) {
        res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Passport ID is required.' } });
        return;
      }

      const obj = await passportService.getByPassportId(passportId);

      logger.info(`🔍 Public Passport lookup success: ${passportId}`);
      res.status(200).json({
        success: true,
        data: obj
      });

    } catch (err: any) {
      if (err instanceof PassportError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async getMarketplaceListings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listings = await passportService.getMarketplaceListings();

      logger.info(`🛒 Public Marketplace Listings fetched. Count: ${listings.length}`);
      res.status(200).json({
        success: true,
        data: listings
      });
    } catch (err) {
      next(err);
    }
  },

  async addRepairRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { passportId } = req.params;
      const { title, cost } = req.body;

      if (!title) {
        res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Repair title is required.' } });
        return;
      }

      const newRecord = await passportService.addRepairRecord(passportId, req.body);

      logger.info(`🛠️ Repair Partner logged repair for passport: ${passportId}. Cost: $${cost}`);
      res.status(201).json({
        success: true,
        data: newRecord
      });
    } catch (err: any) {
      if (err instanceof PassportError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  }
};
