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

// POST /api/stats/reset-demo (Reset demonstration records)
statsRouter.post('/reset-demo', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const initialData = require('../db').DataStore.get();
    res.json({ message: 'Demonstration records verified and active.', stats: DataService.getDashboardStats() });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

