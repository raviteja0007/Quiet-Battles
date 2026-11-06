import { app } from './app';
import http from 'http';

async function runTests() {
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(4005, '127.0.0.1', () => resolve()));
  console.log('Test server bound on http://127.0.0.1:4005');

  const request = async (path: string, options: any = {}) => {
    return new Promise<any>((resolve, reject) => {
      const req = http.request(
        `http://127.0.0.1:4005${path}`,
        {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          },
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (res.statusCode && res.statusCode >= 400) {
                return reject({ status: res.statusCode, data: parsed });
              }
              resolve({ status: res.statusCode, data: parsed });
            } catch (e) {
              resolve({ status: res.statusCode, data: body });
            }
          });
        }
      );
      req.on('error', reject);
      if (options.body) {
        req.write(JSON.stringify(options.body));
      }
      req.end();
    });
  };

  try {
    // 1. Health
    const health = await request('/api/health');
    console.log('✓ PASS /api/health:', health.data.brand, '-', health.data.tagline);

    // 2. Auth Login
    const login = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@quietbattles.com', password: 'Password123!' },
    });
    console.log('✓ PASS /api/auth/login: Role =', login.data.user.role, '| Token length =', login.data.token.length);
    const token = login.data.token;

    // 3. Series
    const series = await request('/api/series');
    console.log('✓ PASS /api/series: Count =', series.data.length, '| Title =', series.data[0].title);

    // 4. Chapters
    const chapters = await request('/api/chapters');
    console.log('✓ PASS /api/chapters: Count =', chapters.data.length, '| Ch 1 =', chapters.data[0].title);

    // 5. Products
    const products = await request('/api/products');
    console.log('✓ PASS /api/products: Count =', products.data.length, '| Flagship =', products.data[0].name);

    // 6. Checkout Order Creation
    const order = await request('/api/orders', {
      method: 'POST',
      body: {
        customerName: 'Marcus Vance',
        customerEmail: 'marcus@quietbattles.com',
        shippingAddress: '445 Lafayette St, New York, NY 10003',
        totalAmount: 380,
        items: [
          {
            productId: products.data[0].id,
            productName: products.data[0].name,
            size: 'L',
            quantity: 1,
            price: 380,
          },
        ],
      },
    });
    console.log('✓ PASS /api/orders: Created order ID =', order.data.id, '| Status =', order.data.orderStatus);

    // 7. Admin Stats
    const stats = await request('/api/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✓ PASS /api/stats: Total orders =', stats.data.totalOrders, '| Total revenue = $' + stats.data.totalRevenue);

    // 8. Media list
    const media = await request('/api/media');
    console.log('✓ PASS /api/media: Count =', media.data.length);

    console.log('\n======================================================');
    console.log('  ALL QUIET BATTLES™ BACKEND REST APIs FULLY PASSED!  ');
    console.log('======================================================\n');
    server.close();
    process.exit(0);
  } catch (err: any) {
    console.error('TEST SUITE ERROR:', err);
    server.close();
    process.exit(1);
  }
}

runTests();
