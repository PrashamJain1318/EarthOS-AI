import { Request, Response, NextFunction } from 'express';
import { scannerService, ScannerError } from '../services/scannerService';
import { logger } from '../config/logger';

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

      const { cached, imageHash, result } = await scannerService.processScan(userId, image, barcode);

      if (cached) {
        logger.info(`⚡ Cached AI scan hit for user ${userId} (Hash: ${imageHash})`);
      } else {
        logger.info(`🤖 AI scan processed and saved for user ${userId} (Hash: ${imageHash})`);
      }

      res.status(200).json({
        success: true,
        data: {
          ...result,
          cached
        }
      });
    } catch (err: any) {
      if (err instanceof ScannerError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  /**
   * GET /api/v1/scanner/history
   */
  async getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const history = await scannerService.getHistory(userId);
      res.status(200).json({ success: true, data: history });
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
      if (!userId) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User session not found.' } });
        return;
      }

      const { id } = req.params;
      const deleted = await scannerService.deleteItem(userId, id);

      if (!deleted) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Scan history item not found.' } });
        return;
      }

      res.status(200).json({ success: true, data: { message: 'Item deleted.' } });
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

      await scannerService.clearHistory(userId);
      res.status(200).json({ success: true, data: { message: 'History cleared successfully.' } });
    } catch (err) {
      next(err);
    }
  }
};
