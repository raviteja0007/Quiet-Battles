import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { seriesRouter } from './routes/series';
import { chaptersRouter } from './routes/chapters';
import { productsRouter } from './routes/products';
import { ordersRouter } from './routes/orders';
import { mediaRouter } from './routes/media';
import { authRouter } from './routes/auth';
import { statsRouter } from './routes/stats';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded media
const uploadsPath = path.resolve(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    brand: 'QUIET BATTLES™',
    tagline: 'WEAR YOUR BATTLES',
    time: new Date().toISOString(),
  });
});

// Mount API routes
app.use('/api/auth', authRouter);
app.use('/api/series', seriesRouter);
app.use('/api/chapters', chaptersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/media', mediaRouter);
app.use('/api/stats', statsRouter);

// 404 handler for API
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ error: `API route ${req.method} ${req.originalUrl} not found` });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`⚔️  QUIET BATTLES™ Backend Server Online`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛡️  Brand: WEAR YOUR BATTLES`);
  console.log(`=================================================\n`);
});

export { app };
