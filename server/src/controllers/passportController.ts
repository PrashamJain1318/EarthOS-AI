import { Request, Response, NextFunction } from 'express';
import { ObjectModel } from '../models/Object';
import { logger } from '../config/logger';
import crypto from 'crypto';

export const passportController = {
  /**
   * GET /api/v1/passports/:passportId
   * Public lookup endpoint retrieving Digital Product Passport (DPP) specs.
   * Excludes sensitive data (PII, exact coordinates, purchase price) for public privacy.
   */
  async getByPassportId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { passportId } = req.params;

      if (!passportId) {
        res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Passport ID is required.' } });
        return;
      }

      const obj = await ObjectModel.findOne({ passportId })
        .select('objectId passportId objectName category subCategory brand model serialNumber condition quantity lifecycleStage carbonScore aiScore images purchaseDate warrantyExpiry donationStatus marketplaceStatus repairCount maintenanceRecords currentOwner previousOwners passportDocuments passportInsights createdAt updatedAt')
        .lean();

      if (!obj) {
        res.status(404).json({ success: false, error: { code: 'PASSPORT_NOT_FOUND', message: `No active passport found for registry key: ${passportId}` } });
        return;
      }

      logger.info(`🔍 Public Passport lookup success: ${passportId}`);
      res.status(200).json({
        success: true,
        data: obj
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/passports/marketplace/listings
   * Public endpoint to fetch all passport objects globally listed in the marketplace.
   */
  async getMarketplaceListings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listings = await ObjectModel.find({ marketplaceStatus: 'LISTED' })
        .select('objectId passportId objectName category subCategory brand model serialNumber condition quantity lifecycleStage carbonScore aiScore images purchasePrice currency currentOwner createdAt')
        .lean();

      logger.info(`🛒 Public Marketplace Listings fetched. Count: ${listings.length}`);
      res.status(200).json({
        success: true,
        data: listings
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/v1/passports/:passportId/repairs
   * Protected Repair Partner endpoint updating maintenance logs on the DPP.
   */
  async addRepairRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { passportId } = req.params;
      const { title, cost, technicianNotes, status } = req.body;

      if (!title) {
        res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Repair title is required.' } });
        return;
      }

      const obj = await ObjectModel.findOne({ passportId });
      if (!obj) {
        res.status(404).json({ success: false, error: { code: 'PASSPORT_NOT_FOUND', message: `No active passport found for registry key: ${passportId}` } });
        return;
      }

      const newRecord = {
        recordId: `REC-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        title,
        type: 'REPAIR' as const,
        date: new Date(),
        cost: Number(cost) || 0,
        technicianNotes: technicianNotes || '',
        receipts: [],
        status: status || 'COMPLETED'
      };

      obj.maintenanceRecords.push(newRecord);
      obj.repairCount = (obj.repairCount || 0) + 1;
      obj.lifecycleStage = 'REPAIR'; // update stage

      await obj.save();

      logger.info(`🛠️ Repair Partner logged repair for passport: ${passportId}. Cost: $${cost}`);
      res.status(201).json({
        success: true,
        data: newRecord
      });
    } catch (err) {
      next(err);
    }
  }
};
