import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

export const chaptersRouter = Router();

// GET /api/chapters
chaptersRouter.get('/', (req: Request, res: Response) => {
  try {
    const seriesId = req.query.seriesId as string | undefined;
    const list = DataService.getAllChapters(seriesId);
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chapters/:id
chaptersRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const item = DataService.getChapterByIdOrSlug(req.params.id);
    if (!item) return res.status(404).json({ error: 'Chapter not found' });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chapters (Admin)
chaptersRouter.post('/', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const { seriesId, chapterNumber, title, slug, description, storyContent, coverImage, status } = req.body;
    if (!seriesId || !title || !description || !storyContent || !coverImage) {
      return res.status(400).json({ error: 'Missing required chapter fields' });
    }
    const created = DataService.createChapter({
      seriesId,
      chapterNumber: Number(chapterNumber) || 1,
      title,
      slug,
      description,
      storyContent,
      coverImage,
      status,
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/chapters/:id (Admin)
chaptersRouter.put('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = DataService.updateChapter(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Chapter not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/chapters/:id (Admin)
chaptersRouter.delete('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const success = DataService.deleteChapter(req.params.id);
    if (!success) return res.status(404).json({ error: 'Chapter not found' });
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

