import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✓ Cloudinary SDK configured and initialized with cloud credentials.');
} else {
  console.log('ℹ️  Cloudinary credentials not set in environment. Image management operating via direct high-res CDN URLs and local multipart storage.');
}

export { cloudinary };

