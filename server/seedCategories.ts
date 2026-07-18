import mongoose from 'mongoose';
import { CategoryModel } from './src/models/Category';
import { env } from './src/config/env';

const INITIAL_CATEGORIES = [
  'ELECTRONICS', 'TEXTILES', 'METALS', 'PLASTICS',
  'ORGANICS', 'GLASS', 'PAPER', 'WOOD', 'CHEMICALS', 'OTHER'
];

async function seed() {
  console.log('Connecting to DB...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected.');

  for (const name of INITIAL_CATEGORIES) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await CategoryModel.findOneAndUpdate(
      { slug },
      { name, usageCount: 0, isActive: true },
      { upsert: true }
    );
  }

  console.log('Categories seeded successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
