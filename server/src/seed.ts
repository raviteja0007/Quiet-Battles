import { db, schema, DataStore } from './db';
import dotenv from 'dotenv';
dotenv.config();

async function runSeed() {
  console.log('🌱 Starting QUIET BATTLES™ database seeding...');
  const initialData = DataStore.get();

  if (!db) {
    console.log('ℹ️  No live DATABASE_URL provided. Local persistent store is already populated with:');
    console.log(`   - ${initialData.users.length} Users`);
    console.log(`   - ${initialData.series.length} Series`);
    console.log(`   - ${initialData.chapters.length} Chapters`);
    console.log(`   - ${initialData.products.length} Products`);
    console.log(`   - ${initialData.orders.length} Orders`);
    console.log('✅ Local persistent data ready.');
    process.exit(0);
  }

  try {
    console.log('Seeding Neon PostgreSQL via Drizzle ORM...');
    
    // Seed Users
    for (const u of initialData.users) {
      await db.insert(schema.users).values({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        createdAt: new Date(u.createdAt),
      }).onConflictDoNothing();
    }
    console.log(`✓ Seeded users (${initialData.users.length})`);

    // Seed Series
    for (const s of initialData.series) {
      await db.insert(schema.series).values({
        id: s.id,
        title: s.title,
        slug: s.slug,
        description: s.description,
        coverImage: s.coverImage,
        status: s.status,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      }).onConflictDoNothing();
    }
    console.log(`✓ Seeded series (${initialData.series.length})`);

    // Seed Chapters
    for (const c of initialData.chapters) {
      await db.insert(schema.chapters).values({
        id: c.id,
        seriesId: c.seriesId,
        chapterNumber: c.chapterNumber,
        title: c.title,
        slug: c.slug,
        description: c.description,
        storyContent: c.storyContent,
        coverImage: c.coverImage,
        status: c.status,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      }).onConflictDoNothing();
    }
    console.log(`✓ Seeded chapters (${initialData.chapters.length})`);

    // Seed Products
    for (const p of initialData.products) {
      await db.insert(schema.products).values({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        category: p.category,
        images: p.images,
        availableSizes: p.availableSizes,
        stock: p.stock,
        status: p.status,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }).onConflictDoNothing();
    }
    console.log(`✓ Seeded products (${initialData.products.length})`);

    console.log('\n🎉 Database successfully seeded with all demonstration records!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during PostgreSQL seeding:', err);
    process.exit(1);
  }
}

runSeed();

