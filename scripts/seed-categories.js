const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://RimonAyurbedic:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/RimonAyurbedic';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
  {
    name: 'Ayurvedic Medicine & Remedies',
    slug: 'ayurvedic-medicine-remedies',
    image: '/assets/images/cagetory/Ayurvedic Medicine & Remedies.webp',
    isActive: true,
  },
  {
    name: 'Herbal Hair & Scalp Care',
    slug: 'herbal-hair-scalp-care',
    image: '/assets/images/cagetory/Herbal Hair & Scalp Care.webp',
    isActive: true,
  },
  {
    name: 'Organic Skin & Beauty',
    slug: 'organic-skin-beauty',
    image: '/assets/images/cagetory/Organic Skin & Beauty.webp',
    isActive: true,
  },
  {
    name: 'Wellness & Dietary Supplements',
    slug: 'wellness-dietary-supplements',
    image: '/assets/images/cagetory/Wellness & Dietary Supplements.webp',
    isActive: true,
  },
  {
    name: 'Organic Herbs & Teas',
    slug: 'organic-herbs-teas',
    image: '/assets/images/cagetory/Organic Herbs & Teas.webp',
    isActive: true,
  }
];

async function seed() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb://RimonAyurbedic:xI2QuBaFZsYQ5vRD@ac-jrowhop-shard-00-00.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-01.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-02.e5n1hnl.mongodb.net:27017/RimonAyurbedic?ssl=true&authSource=admin';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB successfully.');

    // Clear existing categories
    const deleteResult = await Category.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing categories.`);

    // Insert new categories
    const insertResult = await Category.insertMany(categories);
    console.log(`Seeded ${insertResult.length} categories successfully:`);
    insertResult.forEach((c, i) => {
      console.log(`[Category ${i+1}] Name: "${c.name}", Slug: "${c.slug}", Image: "${c.image}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
