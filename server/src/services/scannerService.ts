import crypto from 'crypto';
import { ScanHistoryModel } from '../models/ScanHistory';

export class ScannerError extends Error {
  code: string;
  statusCode: number;
  constructor(message: string, code: string, statusCode = 400) {
    super(message);
    this.name = 'ScannerError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

// Mock values for Backend AI processing fallback
const MOCK_AI_RESPONSE = {
  category: 'Electronics',
  productType: 'Laptop',
  condition: 'Fair',
  damageDetected: ['Scratched chassis', 'Worn keys'],
  confidence: {
    category: 0.98,
    productType: 0.92,
    condition: 0.75,
    overall: 0.88
  }
};

const MOCK_CARBON_RESPONSE = {
  footprint: 180,
  repairBenefit: 135,
  reuseBenefit: 162,
  recyclingBenefit: 63,
  remainingUsefulLife: 2,
  methodology: 'LCA-based estimation utilizing category base baselines adjusted by material factors and manufacturing age efficiencies.',
  confidence: 85
};

export const scannerService = {
  async processScan(userId: string, image: string, barcode?: string) {
    // 1. Validation - File format
    const matches = image.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches) {
      throw new ScannerError('Only Data URIs with image format (JPEG, PNG, WEBP) are supported.', 'UNSUPPORTED_FORMAT', 400);
    }

    const ext = matches[1].toLowerCase();
    if (!['jpeg', 'jpg', 'png', 'webp'].includes(ext)) {
      throw new ScannerError(`Image format .${ext} is not supported. Please use JPEG, PNG, or WEBP.`, 'UNSUPPORTED_FORMAT', 400);
    }

    // 2. Limit file size (5MB maximum)
    const base64Data = matches[2];
    const byteSize = (base64Data.length * 3) / 4;
    if (byteSize > 5 * 1024 * 1024) {
      throw new ScannerError('Image exceeds the maximum allowed size of 5MB.', 'PAYLOAD_TOO_LARGE', 400);
    }

    // 3. Cache check
    const imageHash = crypto.createHash('sha256').update(base64Data).digest('hex');
    const cachedScan = await ScanHistoryModel.findOne({ userId, image: imageHash });
    
    if (cachedScan) {
      return {
        cached: true,
        imageHash,
        result: {
          category: cachedScan.category,
          barcode: cachedScan.barcode,
          ocrData: cachedScan.ocrData,
          aiResult: cachedScan.aiResult,
          carbonEstimate: cachedScan.carbonEstimate
        }
      };
    }

    // 4. Simulate backend AI analysis processing
    const aiResult = MOCK_AI_RESPONSE;
    const carbonEstimate = MOCK_CARBON_RESPONSE;
    
    const ocrData = {
      structuredData: {
        brand: 'MockBrand',
        productName: 'Mock Product',
        modelNumber: 'M-12345',
        serialNumber: 'SN-999888777'
      },
      rawText: 'Mock OCR extracted text block'
    };

    const category = aiResult.category;

    // 5. Store in history
    await ScanHistoryModel.create({
      userId,
      image: imageHash, // Storing hash instead of base64 to save DB size
      barcode: barcode || null,
      ocrData,
      aiResult,
      carbonEstimate,
      category,
      scannedAt: new Date()
    });

    return {
      cached: false,
      imageHash,
      result: {
        category,
        barcode,
        ocrData,
        aiResult,
        carbonEstimate
      }
    };
  },

  async getHistory(userId: string) {
    return ScanHistoryModel.find({ userId })
      .sort({ scannedAt: -1 })
      .limit(50)
      .lean();
  },

  async deleteItem(userId: string, id: string) {
    const deleted = await ScanHistoryModel.findOneAndDelete({ _id: id, userId });
    return deleted !== null;
  },

  async clearHistory(userId: string) {
    await ScanHistoryModel.deleteMany({ userId });
  }
};
