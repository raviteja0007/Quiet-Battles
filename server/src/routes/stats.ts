import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

export const statsRouter = Router();

// GET /api/stats (Admin overview stats)
statsRouter.get('/', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const stats = DataService.getDashboardStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

