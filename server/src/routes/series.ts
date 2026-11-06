import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

export const seriesRouter = Router();

// GET /api/series
seriesRouter.get('/', (req: Request, res: Response) => {
  try {
    const list = DataService.getAllSeries();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/series/:id
seriesRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const item = DataService.getSeriesByIdOrSlug(req.params.id);
    if (!item) return res.status(404).json({ error: 'Series not found' });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/series (Admin)
seriesRouter.post('/', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const { title, slug, description, coverImage, status } = req.body;
    if (!title || !description || !coverImage) {
      return res.status(400).json({ error: 'title, description, and coverImage are required.' });
    }
    const created = DataService.createSeries({ title, slug, description, coverImage, status });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/series/:id (Admin)
seriesRouter.put('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = DataService.updateSeries(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Series not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/series/:id (Admin)
seriesRouter.delete('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const success = DataService.deleteSeries(req.params.id);
    if (!success) return res.status(404).json({ error: 'Series not found' });
    res.json({ message: 'Series deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

