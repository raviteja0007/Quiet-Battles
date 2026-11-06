import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

export const ordersRouter = Router();

// GET /api/orders (Admin)
ordersRouter.get('/', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const list = DataService.getAllOrders();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
ordersRouter.get('/:id', authenticateToken, (req: Request, res: Response) => {
  try {
    const order = DataService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders (Public / Checkout)
ordersRouter.post('/', (req: AuthRequest, res: Response) => {
  try {
    const { customerName, customerEmail, shippingAddress, items, totalAmount } = req.body;
    if (!customerName || !customerEmail || !items || !items.length) {
      return res.status(400).json({ error: 'Customer details and order items are required.' });
    }

    const created = DataService.createOrder({
      userId: req.user?.id,
      customerName,
      customerEmail,
      shippingAddress: shippingAddress || 'Address on file',
      totalAmount: Number(totalAmount) || 0,
      items,
    });

    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id (Admin update status)
ordersRouter.put('/:id', authenticateToken, requireAdmin, (req: Request, res: Response) => {
  try {
    const { orderStatus } = req.body;
    if (!orderStatus) return res.status(400).json({ error: 'orderStatus is required' });
    const updated = DataService.updateOrderStatus(req.params.id, orderStatus);
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

