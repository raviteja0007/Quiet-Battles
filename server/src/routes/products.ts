import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin } from '../middleware/auth';

export const productsRouter = Router();

// GET /api/products
productsRouter.get('/', (req: Request, res: Response) => {
  try {
    const list = DataService.getAllProducts();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
productsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const item = DataService.getProductByIdOrSlug(req.params.id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products (Admin)
productsRouter.post('/', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, category, images, availableSizes, stock, status } = req.body;
    if (!name || !description || price === undefined) {
      return res.status(400).json({ error: 'Name, description, and price are required.' });
    }
    const created = DataService.createProduct({
      name,
      slug,
      description,
      price,
      category,
      images,
      availableSizes,
      stock,
      status,
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id (Admin)
productsRouter.put('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const updated = DataService.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id (Admin)
productsRouter.delete('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const success = DataService.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

