import { DataStore } from '../db';
import { randomUUID } from 'crypto';

export class DataService {
  // === SERIES ===
  static getAllSeries() {
    const store = DataStore.get();
    return store.series || [];
  }

  static getSeriesByIdOrSlug(idOrSlug: string) {
    const store = DataStore.get();
    return store.series?.find((s: any) => s.id === idOrSlug || s.slug === idOrSlug);
  }

  static createSeries(data: { title: string; slug: string; description: string; coverImage: string; status?: string }) {
    const store = DataStore.get();
    const newSeries = {
      id: randomUUID(),
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: data.description,
      coverImage: data.coverImage,
      status: data.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.series = store.series || [];
    store.series.push(newSeries);
    DataStore.save(store);
    return newSeries;
  }

  static updateSeries(id: string, updates: Partial<any>) {
    const store = DataStore.get();
    const index = store.series?.findIndex((s: any) => s.id === id);
    if (index === -1 || index === undefined) return null;
    store.series[index] = {
      ...store.series[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    DataStore.save(store);
    return store.series[index];
  }

  static deleteSeries(id: string) {
    const store = DataStore.get();
    const index = store.series?.findIndex((s: any) => s.id === id);
    if (index === -1 || index === undefined) return false;
    store.series.splice(index, 1);
    // Also cascade remove chapters associated with this series
    store.chapters = store.chapters?.filter((c: any) => c.seriesId !== id);
    DataStore.save(store);
    return true;
  }

  // === CHAPTERS ===
  static getAllChapters(seriesId?: string) {
    const store = DataStore.get();
    let chapters = store.chapters || [];
    if (seriesId) {
      chapters = chapters.filter((c: any) => c.seriesId === seriesId);
    }
    return chapters.sort((a: any, b: any) => a.chapterNumber - b.chapterNumber);
  }

  static getChapterByIdOrSlug(idOrSlug: string) {
    const store = DataStore.get();
    return store.chapters?.find((c: any) => c.id === idOrSlug || c.slug === idOrSlug);
  }

  static createChapter(data: {
    seriesId: string;
    chapterNumber: number;
    title: string;
    slug: string;
    description: string;
    storyContent: string;
    coverImage: string;
    status?: string;
  }) {
    const store = DataStore.get();
    const newChapter = {
      id: randomUUID(),
      seriesId: data.seriesId,
      chapterNumber: Number(data.chapterNumber),
      title: data.title,
      slug: data.slug || `chapter-0${data.chapterNumber}`,
      description: data.description,
      storyContent: data.storyContent,
      coverImage: data.coverImage,
      status: data.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.chapters = store.chapters || [];
    store.chapters.push(newChapter);
    DataStore.save(store);
    return newChapter;
  }

  static updateChapter(id: string, updates: Partial<any>) {
    const store = DataStore.get();
    const index = store.chapters?.findIndex((c: any) => c.id === id);
    if (index === -1 || index === undefined) return null;
    store.chapters[index] = {
      ...store.chapters[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    DataStore.save(store);
    return store.chapters[index];
  }

  static deleteChapter(id: string) {
    const store = DataStore.get();
    const index = store.chapters?.findIndex((c: any) => c.id === id);
    if (index === -1 || index === undefined) return false;
    store.chapters.splice(index, 1);
    DataStore.save(store);
    return true;
  }

  // === PRODUCTS ===
  static getAllProducts() {
    const store = DataStore.get();
    return store.products || [];
  }

  static getProductByIdOrSlug(idOrSlug: string) {
    const store = DataStore.get();
    return store.products?.find((p: any) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  static createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    availableSizes: string[];
    stock?: number;
    status?: string;
  }) {
    const store = DataStore.get();
    const newProduct = {
      id: randomUUID(),
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: data.description,
      price: Number(data.price),
      category: data.category || 'Premium Streetwear',
      images: Array.isArray(data.images) ? data.images : [data.images],
      availableSizes: Array.isArray(data.availableSizes) ? data.availableSizes : ['XS', 'S', 'M', 'L', 'XL'],
      stock: data.stock !== undefined ? Number(data.stock) : 50,
      status: data.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.products = store.products || [];
    store.products.push(newProduct);
    DataStore.save(store);
    return newProduct;
  }

  static updateProduct(id: string, updates: Partial<any>) {
    const store = DataStore.get();
    const index = store.products?.findIndex((p: any) => p.id === id);
    if (index === -1 || index === undefined) return null;
    store.products[index] = {
      ...store.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    DataStore.save(store);
    return store.products[index];
  }

  static deleteProduct(id: string) {
    const store = DataStore.get();
    const index = store.products?.findIndex((p: any) => p.id === id);
    if (index === -1 || index === undefined) return false;
    store.products.splice(index, 1);
    DataStore.save(store);
    return true;
  }

  // === ORDERS ===
  static getAllOrders() {
    const store = DataStore.get();
    return (store.orders || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static getOrderById(id: string) {
    const store = DataStore.get();
    const order = store.orders?.find((o: any) => o.id === id);
    if (!order) return null;
    const items = (store.orderItems || []).filter((item: any) => item.orderId === id);
    return { ...order, items };
  }

  static createOrder(data: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    totalAmount: number;
    items: Array<{
      productId: string;
      productName: string;
      size: string;
      quantity: number;
      price: number;
    }>;
  }) {
    const store = DataStore.get();
    const orderId = randomUUID();
    const newOrder = {
      id: orderId,
      userId: data.userId || null,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      shippingAddress: data.shippingAddress,
      totalAmount: data.totalAmount,
      orderStatus: 'completed',
      createdAt: new Date().toISOString(),
    };

    store.orders = store.orders || [];
    store.orders.unshift(newOrder);

    store.orderItems = store.orderItems || [];
    const createdItems = data.items.map((item) => {
      const orderItem = {
        id: randomUUID(),
        orderId,
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      };
      store.orderItems.push(orderItem);
      return orderItem;
    });

    DataStore.save(store);
    return { ...newOrder, items: createdItems };
  }

  static updateOrderStatus(id: string, orderStatus: string) {
    const store = DataStore.get();
    const order = store.orders?.find((o: any) => o.id === id);
    if (!order) return null;
    order.orderStatus = orderStatus;
    DataStore.save(store);
    return order;
  }

  // === MEDIA ===
  static getAllMedia() {
    const store = DataStore.get();
    return (store.media || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static createMediaRecord(fileName: string, imageUrl: string, cloudinaryPublicId?: string) {
    const store = DataStore.get();
    const newMedia = {
      id: randomUUID(),
      fileName,
      imageUrl,
      cloudinaryPublicId: cloudinaryPublicId || `qb_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    store.media = store.media || [];
    store.media.unshift(newMedia);
    DataStore.save(store);
    return newMedia;
  }

  static deleteMediaRecord(id: string) {
    const store = DataStore.get();
    const index = store.media?.findIndex((m: any) => m.id === id);
    if (index === -1 || index === undefined) return false;
    store.media.splice(index, 1);
    DataStore.save(store);
    return true;
  }

  // === DASHBOARD STATS ===
  static getDashboardStats() {
    const store = DataStore.get();
    const totalSeries = store.series?.length || 0;
    const totalChapters = store.chapters?.length || 0;
    const totalProducts = store.products?.length || 0;
    const totalOrders = store.orders?.length || 0;
    const totalRevenue = (store.orders || []).reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);
    const recentOrders = (store.orders || []).slice(0, 5);

    return {
      totalSeries,
      totalChapters,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
    };
  }
}

