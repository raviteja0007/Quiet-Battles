import { pgTable, text, integer, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('customer'), // 'admin' | 'customer'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const series = pgTable('series', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  coverImage: text('cover_image').notNull(),
  status: text('status').notNull().default('published'), // 'draft' | 'published'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chapters = pgTable('chapters', {
  id: uuid('id').defaultRandom().primaryKey(),
  seriesId: uuid('series_id').references(() => series.id, { onDelete: 'cascade' }).notNull(),
  chapterNumber: integer('chapter_number').notNull(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  storyContent: text('story_content').notNull(),
  coverImage: text('cover_image').notNull(),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // stored in USD or cents (e.g. 290)
  category: text('category').notNull(),
  images: jsonb('images').$type<string[]>().notNull(),
  availableSizes: jsonb('available_sizes').$type<string[]>().notNull(),
  stock: integer('stock').notNull().default(50),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  customerName: text('customer_name'),
  customerEmail: text('customer_email'),
  shippingAddress: text('shipping_address'),
  totalAmount: integer('total_amount').notNull(),
  orderStatus: text('order_status').notNull().default('pending'), // 'pending' | 'completed' | 'cancelled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: uuid('product_id').references(() => products.id),
  productName: text('product_name').notNull(),
  size: text('size').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});

export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileName: text('file_name').notNull(),
  imageUrl: text('image_url').notNull(),
  cloudinaryPublicId: text('cloudinary_public_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

