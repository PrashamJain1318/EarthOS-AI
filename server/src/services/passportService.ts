import { ObjectModel } from '../models/Object';
import crypto from 'crypto';

export class PassportError extends Error {
  code: string;
  statusCode: number;
  constructor(message: string, code: string, statusCode = 400) {
    super(message);
    this.name = 'PassportError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const passportService = {
  async getByPassportId(passportId: string) {
    const obj = await ObjectModel.findOne({ passportId })
      .select('objectId passportId objectName category subCategory brand model serialNumber condition quantity lifecycleStage carbonScore aiScore images purchaseDate warrantyExpiry donationStatus marketplaceStatus repairCount maintenanceRecords currentOwner previousOwners passportDocuments passportInsights createdAt updatedAt')
      .lean();

    if (!obj) {
      throw new PassportError(`No active passport found for registry key: ${passportId}`, 'PASSPORT_NOT_FOUND', 404);
    }

    return obj;
  },

  async getMarketplaceListings() {
    return ObjectModel.find({ marketplaceStatus: 'LISTED' })
      .select('objectId passportId objectName category subCategory brand model serialNumber condition quantity lifecycleStage carbonScore aiScore images purchasePrice currency currentOwner createdAt')
      .lean();
  },

  async addRepairRecord(passportId: string, data: any) {
    const { title, cost, technicianNotes, status } = data;

    const obj = await ObjectModel.findOne({ passportId });
    if (!obj) {
      throw new PassportError(`No active passport found for registry key: ${passportId}`, 'PASSPORT_NOT_FOUND', 404);
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
    obj.lifecycleStage = 'REPAIR';

    await obj.save();

    return newRecord;
  }
};
