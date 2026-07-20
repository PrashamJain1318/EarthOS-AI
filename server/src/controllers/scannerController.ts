import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { ScanHistoryModel } from '../models/ScanHistory';
import { logger } from '../config/logger';

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

export const scannerController = {
  /**
   * POST /api/v1/scanner/scan
   * Processes base64 image and returns OCR, Barcode, Object Recognition, and Carbon Estimates.
   */
  async scan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const { image, barcode } = req.body;

      if (!image) {
        res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Image base64 payload is required.' } });
        return;
      }

      // 1. Validation - File format (Data URI check)
      const matches = image.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
      if (!matches) {
        res.status(400).json({ success: false, error: { code: 'UNSUPPORTED_FORMAT', message: 'Only Data URIs with image format (JPEG, PNG, WEBP) are supported.' } });
        return;
      }

      const ext = matches[1].toLowerCase();
      if (!['jpeg', 'jpg', 'png', 'webp'].includes(ext)) {
        res.status(400).json({ success: false, error: { code: 'UNSUPPORTED_FORMAT', message: `Image format .${ext} is not supported. Please use JPEG, PNG, or WEBP.` } });
        return;
      }

      // 2. Validation - Limit file size (5MB maximum)
      const base64Data = matches[2];
      const byteSize = (base64Data.length * 3) / 4;
      if (byteSize > 5 * 1024 * 1024) {
        res.status(400).json({ success: false, error: { code: 'PAYLOAD_TOO_LARGE', message: 'Image exceeds the maximum allowed size of 5MB.' } });
        return;
      }

      // 3. Cache & Duplicate check (using SHA256 hash of base64 data)
      const imageHash = crypto.createHash('sha256').update(base64Data).digest('hex');
      const cachedScan = await ScanHistoryModel.findOne({ userId, image: imageHash });

      if (cachedScan) {
        logger.info(`⚡ Cached AI scan hit for user ${userId} (Hash: ${imageHash})`);
        res.status(200).json({
          success: true,
          data: {
            category: cachedScan.category,
            barcode: cachedScan.barcode,
            ocrData: cachedScan.ocrData,
            aiResult: cachedScan.aiResult,
            carbonEstimate: cachedScan.carbonEstimate,
            cached: true
          }
        });
        return;
      }

      // 4. Simulate backend AI analysis processing
      // In a real application, we would call Gemini Vision API or Tesseract wrapper here
      const aiResult = MOCK_AI_RESPONSE;
      const carbonEstimate = MOCK_CARBON_RESPONSE;
      
      const ocrData = {
        structuredData: {
          brand: 'MockBrand',
          productName: 'Mock Product',
          modelNumber: 'M-12345',
          serialNumber: 'SN-998877',
          warrantyDate: '2028-12-31',
          purchaseDate: '2026-01-01'
        },
        rawText: 'Mock receipt OCR output: Brand Model Serial Date Warranty expiry',
        confidence: 88.5
      };

      // 5. Save to MongoDB Scan History
      const scanLog = await ScanHistoryModel.create({
        userId: userId as any,
        status: 'success',
        category: aiResult.category,
        barcode: barcode || null,
        ocrData,
        aiResult,
        carbonEstimate,
        image: imageHash // Store SHA256 hash of image to prevent duplicate uploads & serve as cache key
      });

      logger.info(`🔬 Scan processed and logged for user ${userId} (Scan ID: ${scanLog._id})`);

      res.status(201).json({
        success: true,
        data: {
          category: scanLog.category,
          barcode: scanLog.barcode,
          ocrData: scanLog.ocrData,
          aiResult: scanLog.aiResult,
          carbonEstimate: scanLog.carbonEstimate,
          cached: false
        }
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/v1/scanner/history
   * Retrieves paginated scan logs for the authenticated user.
   */
  async getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 5));
      const category = req.query.category as string;
      const search = req.query.search as string;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      const query: any = { userId };

      // Apply category filter
      if (category && category !== 'ALL') {
        query.category = { $regex: new RegExp(category, 'i') };
      }

      // Apply full-text or prefix regex search
      if (search) {
        query.$or = [
          { barcode: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { 'aiResult.productType': { $regex: search, $options: 'i' } }
        ];
      }

      // Apply date range filters
      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) {
          const end = new Date(endDate);
          end.setDate(end.getDate() + 1); // include full day
          query.createdAt.$lte = end;
        }
      }

      const skip = (page - 1) * limit;
      const [items, total] = await Promise.all([
        ScanHistoryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        ScanHistoryModel.countDocuments(query)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        success: true,
        data: items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });

    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/v1/scanner/history/:id
   */
  async deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const deleted = await ScanHistoryModel.findOneAndDelete({ _id: id, userId });
      if (!deleted) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Scan history record not found.' } });
        return;
      }

      res.status(200).json({ success: true, message: 'Scan record deleted.' });

    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/v1/scanner/history
   */
  async clearHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      await ScanHistoryModel.deleteMany({ userId });
      res.status(200).json({ success: true, message: 'Scan history cleared.' });

    } catch (err) {
      next(err);
    }
  }
};
