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
  mongodbUri = 'mongodb+srv://RimonAyurbedic:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/RimonAyurbedic';
}

console.log('Connecting to MongoDB...');

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'Are your Ayurvedic medicines 100% natural and safe?',
    answer: 'Yes, all our Ayurvedic products and herbal remedies are sourced from certified manufacturers, prepared using 100% natural ingredients, and free from harmful chemicals. However, we recommend consulting a physician for specific health conditions.',
    order: 1,
    isActive: true,
  },
  {
    question: 'Do I need a prescription to buy medicines from Rimon Ayurbedic?',
    answer: 'Most of our natural supplements, general wellness tonics, and herbal products do not require a prescription. However, for specialized classical Ayurvedic formulations, we suggest consulting a registered Ayurvedic practitioner.',
    order: 2,
    isActive: true,
  },
  {
    question: 'How should I store the herbal products and liquid tonics?',
    answer: 'We recommend storing all Ayurvedic medicines, tablets, and liquid arishtas in a cool, dry place away from direct sunlight. Always keep the container tightly closed after use.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Do you deliver all over Bangladesh, and what are the charges?',
    answer: 'Yes, we deliver nationwide. Inside Dhaka, delivery takes 24 to 48 hours, and outside Dhaka, it takes 3 to 5 business days. Delivery charges are ৳60 inside Dhaka and ৳120 outside Dhaka, with free delivery on orders above ৳1000.',
    order: 4,
    isActive: true,
  },
  {
    question: 'What is your return policy for Ayurvedic medicines?',
    answer: 'We offer a 7-day easy return policy for all sealed and unused products in their original packaging. For safety and hygiene reasons, opened or used medicines and liquid tonics cannot be returned.',
    order: 5,
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

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i+1}] Question: "${f.question}"`);
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
