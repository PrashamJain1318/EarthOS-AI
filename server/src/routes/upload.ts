import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { authMiddleware } from '../middlewares/auth';

const uploadRouter = Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Generate unique random filename to prevent collisions
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Configure Multer upload limits and filters
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

// Protect upload endpoint
uploadRouter.use(authMiddleware);

// POST /api/v1/upload
uploadRouter.post('/', upload.array('images', 10), (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded.' });
    }

    // Return the accessible URL paths
    const fileUrls = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);

    return res.status(200).json({
      success: true,
      data: fileUrls
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || 'Image upload failed.' });
  }
});

export default uploadRouter;
