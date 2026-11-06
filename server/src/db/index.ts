import { drizzle } from 'drizzle-orm/node-postgres';
// @ts-ignore
import { Pool } from 'pg';
import * as schema from './schema';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

// Setup data directory and store for local fallback
const DATA_DIR = path.resolve(__dirname, '../../data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data
const initialData = {
  users: [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Studio Master',
      email: 'admin@quietbattles.com',
      password: bcrypt.hashSync('Password123!', 10),
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Marcus Vance',
      email: 'customer@quietbattles.com',
      password: bcrypt.hashSync('Password123!', 10),
      role: 'customer',
      createdAt: new Date().toISOString(),
    },
  ],
  series: [
    {
      id: '33333333-3333-3333-3333-333333333333',
      title: 'SERIES 01 – THE GENTLE ARMOR™',
      slug: 'series-01',
      description: 'Strength does not always arrive with noise. Sometimes, it is found in softness, in patience, and in the courage to continue.',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  chapters: [
    {
      id: '44444444-4444-4444-4444-444444444001',
      seriesId: '33333333-3333-3333-3333-333333333333',
      chapterNumber: 1,
      title: 'CHAPTER 01 – THE FIRST SCAR',
      slug: 'chapter-01',
      description: 'Some battles begin before the world notices. They leave marks that cannot always be seen, but they shape who we become.',
      storyContent: `Some battles begin before the world notices. They leave marks that cannot always be seen, but they shape who we become. The first scar is not a sign of weakness. It is proof that we continued.

In the quiet rooms of early morning, before the city demands performance, there is an unspoken realization: endurance is an internal discipline. We dress not to hide our fractures, but to honor the resilience forged through them.

The fabric of our identity is spun from moments of profound isolation and quiet victories. When the noise fades, what remains is the weight of our convictions and the silent armor we wear every single day.`,
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444002',
      seriesId: '33333333-3333-3333-3333-333333333333',
      chapterNumber: 2,
      title: 'CHAPTER 02 – THE WEIGHT WE CARRY',
      slug: 'chapter-02',
      description: 'Silence is rarely empty; it is heavy with thoughts left unspoken. We carry expectations silently, turning burdens into posture.',
      storyContent: 'We walk through crowded avenues carrying invisible loads. The weight is neither light nor unforgiving; it tests the spine and refines the character. Every fold and contour of heavy cotton serves as a testament to balance under pressure.',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444003',
      seriesId: '33333333-3333-3333-3333-333333333333',
      chapterNumber: 3,
      title: 'CHAPTER 03 – THE SILENT WAR',
      slug: 'chapter-03',
      description: 'In the quiet hours between darkness and dawn, the hardest battles are fought without an audience. Victory is felt in the decision to stand again.',
      storyContent: 'True confrontation requires neither shouting nor fanfare. It takes place in the mind, confronting doubt with stoic stillness. When you move through the world grounded in self-possession, no external turbulence can disturb your center.',
      coverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444004',
      seriesId: '33333333-3333-3333-3333-333333333333',
      chapterNumber: 4,
      title: 'CHAPTER 04 – THE ART OF HEALING',
      slug: 'chapter-04',
      description: 'Healing is not the erasure of trauma, but the weaving of gold through fractures. Every stitch is deliberate, turning vulnerability into presence.',
      storyContent: 'The Japanese art of kintsugi teaches that brokenness treated with care becomes the most captivating part of the vessel. In tailoring, the raw hems, visible topstitches, and deconstructed seams echo this timeless truth: perfection is sterile, while scars carry grace.',
      coverImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444005',
      seriesId: '33333333-3333-3333-3333-333333333333',
      chapterNumber: 5,
      title: 'CHAPTER 05 – THE GENTLE ARMOR',
      slug: 'chapter-05',
      description: 'When you no longer need to prove anything to the world, your clothing ceases to be a shield of aggression and becomes an armor of quiet calm.',
      storyContent: 'The ultimate form of strength is gentleness. An armor crafted from heavyweight Japanese loopback terry and custom washed wool that shelters the body while liberating the spirit. Wear what made you.',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  products: [
    {
      id: '55555555-5555-5555-5555-555555555001',
      name: 'THE GENTLE ARMOR™',
      slug: 'gentle-armor',
      description: 'Designed for those who carry their stories quietly. The Gentle Armor represents resilience, identity, and the strength found in softness. Handcrafted from 540 GSM double-faced Japanese structured wool with raw edge finishes, dropped shoulders, and internal commemorative numbering.',
      price: 380,
      category: 'Premium Streetwear',
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      ],
      availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      stock: 42,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555002',
      name: 'THE SILENT PARKA™',
      slug: 'silent-parka',
      description: 'An oversized technical silhouette cut from matte stormproof membrane with magnetic storm flaps and tonal reflective branding.',
      price: 520,
      category: 'Outerwear',
      images: [
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
      ],
      availableSizes: ['S', 'M', 'L', 'XL'],
      stock: 18,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555003',
      name: 'VULNERABILITY OVERSIZED HOODIE™',
      slug: 'vulnerability-hoodie',
      description: 'Heavyweight 600 GSM French terry hoodie with blind seam construction and distressed silver eyelets.',
      price: 290,
      category: 'Knitwear',
      images: [
        'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      ],
      availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      stock: 35,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555004',
      name: 'MONOLITH TAILORED TROUSER™',
      slug: 'monolith-trouser',
      description: 'Wide-leg draped architectural trousers featuring deep front pleats and adjustable side cinches.',
      price: 340,
      category: 'Trousers',
      images: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      ],
      availableSizes: ['S', 'M', 'L', 'XL'],
      stock: 24,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: '66666666-6666-6666-6666-666666666001',
      userId: '22222222-2222-2222-2222-222222222222',
      customerName: 'Marcus Vance',
      customerEmail: 'customer@quietbattles.com',
      shippingAddress: '445 Lafayette St, New York, NY 10003',
      totalAmount: 380,
      orderStatus: 'completed',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ],
  orderItems: [
    {
      id: '77777777-7777-7777-7777-777777777001',
      orderId: '66666666-6666-6666-6666-666666666001',
      productId: '55555555-5555-5555-5555-555555555001',
      productName: 'THE GENTLE ARMOR™',
      size: 'L',
      quantity: 1,
      price: 380,
    },
  ],
  media: [
    {
      id: '88888888-8888-8888-8888-888888888001',
      fileName: 'gentle_armor_editorial_01.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      cloudinaryPublicId: 'quiet_battles/gentle_armor_editorial_01',
      createdAt: new Date().toISOString(),
    },
    {
      id: '88888888-8888-8888-8888-888888888002',
      fileName: 'first_scar_portrait.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      cloudinaryPublicId: 'quiet_battles/first_scar_portrait',
      createdAt: new Date().toISOString(),
    },
    {
      id: '88888888-8888-8888-8888-888888888003',
      fileName: 'silent_war_mood.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop',
      cloudinaryPublicId: 'quiet_battles/silent_war_mood',
      createdAt: new Date().toISOString(),
    },
  ],
};

// Initialize file store if not present
if (!fs.existsSync(STORE_FILE)) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
}

// Memory / File Store abstraction
export class DataStore {
  static get() {
    try {
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return initialData;
    }
  }

  static save(data: any) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}

// Drizzle Client setup (if DATABASE_URL provided)
let drizzleDb: any = null;
if (process.env.DATABASE_URL) {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
    drizzleDb = drizzle(pool, { schema });
    console.log('Connected to PostgreSQL database with Drizzle ORM.');
  } catch (err) {
    console.warn('PostgreSQL connection attempt encountered an issue, falling back to local persistent store.', err);
  }
} else {
  console.log('No DATABASE_URL provided. Operating in high-performance local persistent store mode.');
}

export const db = drizzleDb;
export { schema };
