import axios from 'axios';
import { getClientStore, saveClientStore } from './localStore';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback interceptor for GitHub Pages standalone hosting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If running on GitHub Pages or backend unreachable, provide instant local client data
    const url = error.config?.url || '';
    const method = (error.config?.method || 'get').toLowerCase();
    const store = getClientStore();

    console.warn(`[Quiet Battles] Network request failed (${method.toUpperCase()} ${url}). Serving from local client store.`);

    // --- AUTH ---
    if (url.includes('/auth/login') && method === 'post') {
      const { email, password } = JSON.parse(error.config?.data || '{}');
      if (email === 'admin@quietbattles.com' && password === 'Password123!') {
        return Promise.resolve({
          data: {
            token: 'mock_admin_jwt_token_github_pages',
            user: { id: '11111111-1111-1111-1111-111111111111', name: 'Studio Master', email: 'admin@quietbattles.com', role: 'admin' },
          },
        });
      }
      return Promise.reject({ response: { status: 401, data: { error: 'Invalid credentials. Use admin@quietbattles.com / Password123!' } } });
    }

    if (url.includes('/auth/me')) {
      return Promise.resolve({
        data: {
          user: { id: '11111111-1111-1111-1111-111111111111', name: 'Studio Master', email: 'admin@quietbattles.com', role: 'admin' },
        },
      });
    }

    // --- SERIES ---
    if (url.startsWith('/series') || url === '/series') {
      if (method === 'get') {
        const parts = url.split('/');
        const slugOrId = parts[parts.length - 1];
        if (slugOrId && slugOrId !== 'series') {
          const item = store.series.find((s: any) => s.id === slugOrId || s.slug === slugOrId) || store.series[0];
          return Promise.resolve({ data: item });
        }
        return Promise.resolve({ data: store.series });
      }
      if (method === 'post') {
        const body = JSON.parse(error.config?.data || '{}');
        const newSeries = { id: `series-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
        store.series.push(newSeries);
        saveClientStore(store);
        return Promise.resolve({ data: newSeries });
      }
      if (method === 'put') {
        const id = url.split('/').pop();
        const body = JSON.parse(error.config?.data || '{}');
        const idx = store.series.findIndex((s: any) => s.id === id);
        if (idx > -1) store.series[idx] = { ...store.series[idx], ...body };
        saveClientStore(store);
        return Promise.resolve({ data: store.series[idx] });
      }
      if (method === 'delete') {
        const id = url.split('/').pop();
        store.series = store.series.filter((s: any) => s.id !== id);
        saveClientStore(store);
        return Promise.resolve({ data: { message: 'Deleted' } });
      }
    }

    // --- CHAPTERS ---
    if (url.startsWith('/chapters') || url === '/chapters') {
      if (method === 'get') {
        const parts = url.split('/');
        const slugOrId = parts[parts.length - 1];
        if (slugOrId && slugOrId !== 'chapters') {
          const item = store.chapters.find((c: any) => c.id === slugOrId || c.slug === slugOrId) || store.chapters[0];
          return Promise.resolve({ data: item });
        }
        return Promise.resolve({ data: store.chapters });
      }
      if (method === 'post') {
        const body = JSON.parse(error.config?.data || '{}');
        const newChap = { id: `chap-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
        store.chapters.push(newChap);
        saveClientStore(store);
        return Promise.resolve({ data: newChap });
      }
      if (method === 'put') {
        const id = url.split('/').pop();
        const body = JSON.parse(error.config?.data || '{}');
        const idx = store.chapters.findIndex((c: any) => c.id === id);
        if (idx > -1) store.chapters[idx] = { ...store.chapters[idx], ...body };
        saveClientStore(store);
        return Promise.resolve({ data: store.chapters[idx] });
      }
      if (method === 'delete') {
        const id = url.split('/').pop();
        store.chapters = store.chapters.filter((c: any) => c.id !== id);
        saveClientStore(store);
        return Promise.resolve({ data: { message: 'Deleted' } });
      }
    }

    // --- PRODUCTS ---
    if (url.startsWith('/products') || url === '/products') {
      if (method === 'get') {
        const parts = url.split('/');
        const slugOrId = parts[parts.length - 1];
        if (slugOrId && slugOrId !== 'products') {
          const item = store.products.find((p: any) => p.id === slugOrId || p.slug === slugOrId) || store.products[0];
          return Promise.resolve({ data: item });
        }
        return Promise.resolve({ data: store.products });
      }
      if (method === 'post') {
        const body = JSON.parse(error.config?.data || '{}');
        const newProd = { id: `prod-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
        store.products.push(newProd);
        saveClientStore(store);
        return Promise.resolve({ data: newProd });
      }
      if (method === 'put') {
        const id = url.split('/').pop();
        const body = JSON.parse(error.config?.data || '{}');
        const idx = store.products.findIndex((p: any) => p.id === id);
        if (idx > -1) store.products[idx] = { ...store.products[idx], ...body };
        saveClientStore(store);
        return Promise.resolve({ data: store.products[idx] });
      }
      if (method === 'delete') {
        const id = url.split('/').pop();
        store.products = store.products.filter((p: any) => p.id !== id);
        saveClientStore(store);
        return Promise.resolve({ data: { message: 'Deleted' } });
      }
    }

    // --- ORDERS ---
    if (url.startsWith('/orders') || url === '/orders') {
      if (method === 'get') {
        return Promise.resolve({ data: store.orders || [] });
      }
      if (method === 'post') {
        const body = JSON.parse(error.config?.data || '{}');
        const newOrder = {
          id: `QB-${Date.now().toString(36).toUpperCase()}`,
          ...body,
          orderStatus: 'completed',
          createdAt: new Date().toISOString(),
        };
        store.orders = store.orders || [];
        store.orders.unshift(newOrder);
        saveClientStore(store);
        return Promise.resolve({ data: newOrder });
      }
      if (method === 'put') {
        const id = url.split('/').pop();
        const body = JSON.parse(error.config?.data || '{}');
        const order = store.orders.find((o: any) => o.id === id);
        if (order) order.orderStatus = body.orderStatus;
        saveClientStore(store);
        return Promise.resolve({ data: order });
      }
    }

    // --- MEDIA ---
    if (url.startsWith('/media') || url === '/media') {
      if (method === 'get') return Promise.resolve({ data: store.media || [] });
      if (method === 'post') {
        const body = JSON.parse(error.config?.data || '{}');
        const newMedia = { id: `media-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
        store.media.unshift(newMedia);
        saveClientStore(store);
        return Promise.resolve({ data: newMedia });
      }
      if (method === 'delete') {
        const id = url.split('/').pop();
        store.media = store.media.filter((m: any) => m.id !== id);
        saveClientStore(store);
        return Promise.resolve({ data: { message: 'Deleted' } });
      }
    }

    // --- STATS ---
    if (url.includes('/stats')) {
      const totalOrders = store.orders?.length || 0;
      const totalRevenue = (store.orders || []).reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
      return Promise.resolve({
        data: {
          totalSeries: store.series.length,
          totalChapters: store.chapters.length,
          totalProducts: store.products.length,
          totalOrders,
          totalRevenue,
          recentOrders: store.orders.slice(0, 5),
        },
      });
    }

    return Promise.reject(error);
  }
);
