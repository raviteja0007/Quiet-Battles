import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const mediaRouter = Router();

// Setup local uploads directory
const UPLOADS_DIR = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// GET /api/media
mediaRouter.get('/', (req: Request, res: Response) => {
  try {
    const list = DataService.getAllMedia();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/media/upload (File upload or direct URL)
mediaRouter.post('/upload', authenticateToken, requireAdmin, upload.single('image'), (req: Request, res: Response) => {
  try {
    if (req.file) {
      const publicUrl = `/uploads/${req.file.filename}`;
      const record = DataService.createMediaRecord(req.file.originalname, publicUrl);
      return res.status(201).json(record);
    }

    const { imageUrl, fileName } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Please provide an image file or an imageUrl.' });
    }

    const name = fileName || imageUrl.split('/').pop()?.split('?')[0] || 'editorial-asset.jpg';
    const record = DataService.createMediaRecord(name, imageUrl);
    res.status(201).json(record);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/media/:id (Admin)
mediaRouter.delete('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const success = DataService.deleteMediaRecord(req.params.id);
    if (!success) return res.status(404).json({ error: 'Media not found' });
    res.json({ message: 'Media asset deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

