import { Request, Response, NextFunction } from 'express';
import { ObjectModel } from '../models/Object';
import { logger } from '../config/logger';

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
        .select('objectId passportId objectName category subCategory brand model serialNumber condition quantity lifecycleStage carbonScore aiScore images purchaseDate warrantyExpiry donationStatus marketplaceStatus repairCount maintenanceRecords currentOwner previousOwners createdAt updatedAt')
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
  }
};
