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

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  // Category 1: Ayurvedic Medicine & Remedies (5 Products)
  {
    name: 'Maha Bhringraj Taila',
    slug: 'maha-bhringraj-taila',
    description: 'Traditional Ayurvedic hair oil processed with Bhringraj juice and sesame oil. Prevents hair fall, promotes growth, and cools the scalp.',
    price: 350,
    salePrice: 290,
    discountRate: 17,
    purchasePrice: 200,
    stock: 120,
    sku: 'RA-MED-MBT01',
    categorySlug: 'ayurvedic-medicine-remedies',
    images: ['/assets/images/products/maha_bhringraj_taila.webp'],
    tags: ['hair oil', 'bhringraj', 'ayurvedic', 'remedy'],
    attributes: [{ key: 'Volume', value: '200ml' }, { key: 'Base', value: 'Sesame Oil' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Organic Ashwagandha Powder',
    slug: 'organic-ashwagandha-powder',
    description: '100% pure organic Ashwagandha (Withania somnifera) root powder. Boosts energy, relieves stress, and strengthens the immune system.',
    price: 450,
    salePrice: 390,
    discountRate: 13,
    purchasePrice: 250,
    stock: 80,
    sku: 'RA-MED-OAP02',
    categorySlug: 'ayurvedic-medicine-remedies',
    images: ['/assets/images/products/organic_ashwagandha_powder.webp'],
    tags: ['ashwagandha', 'immunity', 'energy', 'stress relief'],
    attributes: [{ key: 'Weight', value: '100g' }, { key: 'Form', value: 'Powder' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Triphala Churna Tablets',
    slug: 'triphala-churna-tablets',
    description: 'Ayurvedic formulation of Amla, Haritaki, and Bibhitaki. Supports healthy digestion, gentle colon cleanse, and daily detoxification.',
    price: 280,
    salePrice: 220,
    discountRate: 21,
    purchasePrice: 150,
    stock: 150,
    sku: 'RA-MED-TCT03',
    categorySlug: 'ayurvedic-medicine-remedies',
    images: ['/assets/images/products/triphala_churna_tablets.webp'],
    tags: ['triphala', 'digestion', 'detox', 'tablets'],
    attributes: [{ key: 'Count', value: '60 Tablets' }, { key: 'Form', value: 'Tablet' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Giloy Neem Juice',
    slug: 'giloy-neem-juice',
    description: 'Powerful wellness juice blend of Giloy (Tinospora cordifolia) and Neem. Purifies blood, manages skin disorders, and boosts daily immunity.',
    price: 380,
    purchasePrice: 220,
    stock: 60,
    sku: 'RA-MED-GNJ04',
    categorySlug: 'ayurvedic-medicine-remedies',
    images: ['/assets/images/products/giloy_neem_juice.webp'],
    tags: ['giloy', 'neem', 'juice', 'immunity'],
    attributes: [{ key: 'Volume', value: '500ml' }, { key: 'Type', value: 'Herbal Juice' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Herbal Cough Syrup (Vasaka & Yashtimadhu)',
    slug: 'herbal-cough-syrup',
    description: 'Non-drowsy Ayurvedic cough relief formula infused with Vasaka, Yashtimadhu, and Kantakari. Effectively soothens dry and wet throat congestion.',
    price: 180,
    purchasePrice: 100,
    stock: 200,
    sku: 'RA-MED-HCS05',
    categorySlug: 'ayurvedic-medicine-remedies',
    images: ['/assets/images/products/herbal_cough_syrup.webp'],
    tags: ['cough syrup', 'vasaka', 'yashtimadhu', 'cold relief'],
    attributes: [{ key: 'Volume', value: '100ml' }, { key: 'Alcohol Free', value: 'Yes' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },

  // Category 2: Herbal Hair & Scalp Care (5 Products)
  {
    name: 'Pure Bhringraj & Amla Hair Oil',
    slug: 'pure-bhringraj-amla-hair-oil',
    description: 'Revitalizing hair oil enriched with fresh Bhringraj, Amla, and Coconut oil base. Deeply nourishes hair follicles to prevent premature greying.',
    price: 400,
    salePrice: 350,
    discountRate: 12,
    purchasePrice: 240,
    stock: 90,
    sku: 'RA-HAI-BAH06',
    categorySlug: 'herbal-hair-scalp-care',
    images: ['/assets/images/products/bhringraj_amla_hair_oil.webp'],
    tags: ['hair oil', 'bhringraj', 'amla', 'greying'],
    attributes: [{ key: 'Volume', value: '150ml' }, { key: 'Fragrance', value: 'Natural Herbal' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Hibiscus & Shikakai Hair Pack',
    slug: 'hibiscus-shikakai-hair-pack',
    description: 'Natural conditioning hair mask powder. Hibiscus makes hair silky and shiny, while Shikakai cleanses and removes excess scalp oils.',
    price: 220,
    purchasePrice: 120,
    stock: 110,
    sku: 'RA-HAI-HSH07',
    categorySlug: 'herbal-hair-scalp-care',
    images: ['/assets/images/products/hibiscus_shikakai_hair_pack.webp'],
    tags: ['hair pack', 'hibiscus', 'shikakai', 'conditioner'],
    attributes: [{ key: 'Weight', value: '100g' }, { key: 'Form', value: 'Powder' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Tea Tree & Neem Anti-Dandruff Shampoo',
    slug: 'tea-tree-neem-anti-dandruff-shampoo',
    description: 'Sulfate-free Ayurvedic shampoo formulated with tea tree oil and neem extracts. Cleanses scalp irritation and eliminates flakes naturally.',
    price: 320,
    salePrice: 280,
    discountRate: 12,
    purchasePrice: 180,
    stock: 75,
    sku: 'RA-HAI-ADS08',
    categorySlug: 'herbal-hair-scalp-care',
    images: ['/assets/images/products/anti_dandruff_shampoo.webp'],
    tags: ['shampoo', 'tea tree', 'neem', 'anti-dandruff'],
    attributes: [{ key: 'Volume', value: '250ml' }, { key: 'Sulfate-Free', value: 'Yes' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Red Onion Hair Growth Serum',
    slug: 'red-onion-hair-growth-serum',
    description: 'Lightweight, non-greasy hair growth serum with red onion extract, black seed oil, and biotin. Stimulates roots and boosts hair thickness.',
    price: 490,
    salePrice: 420,
    discountRate: 14,
    purchasePrice: 300,
    stock: 50,
    sku: 'RA-HAI-HGS09',
    categorySlug: 'herbal-hair-scalp-care',
    images: ['/assets/images/products/onion_hair_serum.webp'],
    tags: ['hair serum', 'onion oil', 'growth', 'biotin'],
    attributes: [{ key: 'Volume', value: '50ml' }, { key: 'Application', value: 'Scalp Drops' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Natural Henna & Indigo Powder Set',
    slug: 'natural-henna-indigo-powder-set',
    description: '100% organic Lawsonia inermis (Henna) and Indigofera tinctoria (Indigo) leaves powder. Provides natural brown to black hair dye without chemicals.',
    price: 260,
    purchasePrice: 140,
    stock: 130,
    sku: 'RA-HAI-HIP10',
    categorySlug: 'herbal-hair-scalp-care',
    images: ['/assets/images/products/henna_indigo_set.webp'],
    tags: ['henna', 'indigo', 'hair color', 'natural dye'],
    attributes: [{ key: 'Henna Weight', value: '100g' }, { key: 'Indigo Weight', value: '100g' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },

  // Category 3: Organic Skin & Beauty (5 Products)
  {
    name: 'Kumkumadi Radiant Glow Face Serum',
    slug: 'kumkumadi-radiant-glow-face-serum',
    description: 'Miraculous beauty fluid containing Kashmiri saffron, sandalwood, and 26 rare Ayurvedic herbs. Illuminates skin complexion and reduces dark circles.',
    price: 850,
    salePrice: 690,
    discountRate: 19,
    purchasePrice: 400,
    stock: 40,
    sku: 'RA-SKN-KFS11',
    categorySlug: 'organic-skin-beauty',
    images: ['/assets/images/products/kumkumadi_face_serum.webp'],
    tags: ['serum', 'kumkumadi', 'saffron', 'radiant skin'],
    attributes: [{ key: 'Volume', value: '30ml' }, { key: 'Suitable For', value: 'All Skin Types' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Organic Neem & Turmeric Face Wash',
    slug: 'organic-neem-turmeric-face-wash',
    description: 'Purifying neem & turmeric herbal gel face wash. Deeply cleanses acne-causing bacteria and excess oil while preserving natural skin moisture.',
    price: 220,
    purchasePrice: 120,
    stock: 140,
    sku: 'RA-SKN-NFW12',
    categorySlug: 'organic-skin-beauty',
    images: ['/assets/images/products/neem_turmeric_wash.webp'],
    tags: ['face wash', 'neem', 'turmeric', 'acne control'],
    attributes: [{ key: 'Volume', value: '100ml' }, { key: 'Soap-Free', value: 'Yes' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Sandalwood & Saffron Face Pack',
    slug: 'sandalwood-saffron-face-pack',
    description: 'Traditional Ayurvedic ubtan face mask powder. Pure sandalwood powder and Kashmiri saffron threads blend to soothe skin tan and bring instant glow.',
    price: 350,
    salePrice: 300,
    discountRate: 14,
    purchasePrice: 180,
    stock: 85,
    sku: 'RA-SKN-SFP13',
    categorySlug: 'organic-skin-beauty',
    images: ['/assets/images/products/sandalwood_saffron_pack.webp'],
    tags: ['face pack', 'sandalwood', 'saffron', 'ubtan'],
    attributes: [{ key: 'Weight', value: '75g' }, { key: 'Form', value: 'Powder' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Handmade Neem & Basil Herbal Soap',
    slug: 'handmade-neem-basil-herbal-soap',
    description: 'Cold-pressed moisturizing bath soap bar made with organic neem leaf powder, holy basil essential oil, and pure coconut oil base.',
    price: 150,
    purchasePrice: 80,
    stock: 220,
    sku: 'RA-SKN-NBS14',
    categorySlug: 'organic-skin-beauty',
    images: ['/assets/images/products/neem_basil_soap.webp'],
    tags: ['soap', 'neem', 'basil', 'organic soap'],
    attributes: [{ key: 'Weight', value: '125g' }, { key: 'Process', value: 'Cold-Pressed' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Pure Rose Water Skin Toner',
    slug: 'pure-rose-water-skin-toner',
    description: '100% steam-distilled rose water from fresh Kannauj roses. Acts as a natural skin hydrator, toner, and refreshing facial mist.',
    price: 250,
    purchasePrice: 130,
    stock: 110,
    sku: 'RA-SKN-RWT15',
    categorySlug: 'organic-skin-beauty',
    images: ['/assets/images/products/rose_water_toner.webp'],
    tags: ['rose water', 'toner', 'facial mist', 'hydration'],
    attributes: [{ key: 'Volume', value: '200ml' }, { key: 'Distilled', value: 'Steam-Distilled' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },

  // Category 4: Wellness & Dietary Supplements (5 Products)
  {
    name: 'Premium Ayurvedic Chyawanprash',
    slug: 'premium-ayurvedic-chyawanprash',
    description: 'Amla-based immunity-boosting herbal paste enriched with 40+ vital Ayurvedic herbs including Giloy, Pippali, and Shatavari. Nourishing family health.',
    price: 550,
    salePrice: 490,
    discountRate: 10,
    purchasePrice: 320,
    stock: 95,
    sku: 'RA-WEL-PAC16',
    categorySlug: 'wellness-dietary-supplements',
    images: ['/assets/images/products/premium_chyawanprash.webp'],
    tags: ['chyawanprash', 'immunity', 'supplement', 'amla'],
    attributes: [{ key: 'Weight', value: '500g' }, { key: 'Dosage', value: '1-2 teaspoons daily' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Raw Organic Sundarban Honey',
    slug: 'raw-organic-sundarban-honey',
    description: '100% natural, unprocessed wild honey sourced directly from the Sundarbans mangrove forests. Rich in antioxidants and health benefits.',
    price: 450,
    purchasePrice: 260,
    stock: 80,
    sku: 'RA-WEL-RSH17',
    categorySlug: 'wellness-dietary-supplements',
    images: ['/assets/images/products/sundarban_honey.webp'],
    tags: ['honey', 'organic honey', 'sundarban', 'dietary'],
    attributes: [{ key: 'Weight', value: '250g' }, { key: 'Purity', value: '100% Raw' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Organic Spirulina Capsules',
    slug: 'organic-spirulina-capsules',
    description: 'Superfood supplement capsules packed with protein, vitamins, and minerals. Detoxifies the body and supports daily energy levels.',
    price: 380,
    salePrice: 340,
    discountRate: 10,
    purchasePrice: 200,
    stock: 120,
    sku: 'RA-WEL-OSC18',
    categorySlug: 'wellness-dietary-supplements',
    images: ['/assets/images/products/organic_spirulina_capsules.webp'],
    tags: ['spirulina', 'superfood', 'energy', 'capsules'],
    attributes: [{ key: 'Count', value: '90 Capsules' }, { key: 'Type', value: 'Vegetarian' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Moringa Leaf Powder Supplement',
    slug: 'moringa-leaf-powder-supplement',
    description: '100% organic Moringa oleifera dried leaf powder. A natural multivitamin source that strengthens bones and regulates blood pressure.',
    price: 240,
    purchasePrice: 130,
    stock: 150,
    sku: 'RA-WEL-MLP19',
    categorySlug: 'wellness-dietary-supplements',
    images: ['/assets/images/products/moringa_leaf_powder.webp'],
    tags: ['moringa', 'multivitamin', 'superfood', 'powder'],
    attributes: [{ key: 'Weight', value: '100g' }, { key: 'Form', value: 'Powder' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Kalonji (Black Seed) Oil',
    slug: 'kalonji-black-seed-oil',
    description: 'Cold-pressed black cumin seed (Nigella sativa) oil. Helps boost metabolism, aids weight management, and nurtures skin and respiration.',
    price: 360,
    purchasePrice: 200,
    stock: 90,
    sku: 'RA-WEL-KBS20',
    categorySlug: 'wellness-dietary-supplements',
    images: ['/assets/images/products/kalonji_black_seed_oil.webp'],
    tags: ['black seed', 'kalonji oil', 'metabolism', 'cold-pressed'],
    attributes: [{ key: 'Volume', value: '100ml' }, { key: 'Extraction', value: 'Cold-Pressed' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },

  // Category 5: Organic Herbs & Teas (5 Products)
  {
    name: 'Organic Tulsi Ginger Green Tea',
    slug: 'organic-tulsi-ginger-green-tea',
    description: 'Refreshing wellness tea blend of holy basil (Tulsi), spicy ginger, and fine green tea leaves. Relieves stress and combats cold symptoms.',
    price: 280,
    purchasePrice: 140,
    stock: 160,
    sku: 'RA-TEA-TGT21',
    categorySlug: 'organic-herbs-teas',
    images: ['/assets/images/products/tulsi_ginger_tea.webp'],
    tags: ['green tea', 'tulsi tea', 'ginger', 'stress relief'],
    attributes: [{ key: 'Count', value: '25 Tea Bags' }, { key: 'Type', value: 'Green Tea' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Dried Hibiscus Petals Tea',
    slug: 'dried-hibiscus-petals-tea',
    description: 'Tarty, cranberry-like herbal tea made from dried hibiscus calyces. Supports healthy blood circulation and regulates cholesterol levels.',
    price: 320,
    purchasePrice: 180,
    stock: 70,
    sku: 'RA-TEA-DHP22',
    categorySlug: 'organic-herbs-teas',
    images: ['/assets/images/products/hibiscus_petals_tea.webp'],
    tags: ['hibiscus', 'herbal tea', 'cholesterol', 'loose leaf'],
    attributes: [{ key: 'Weight', value: '100g' }, { key: 'Form', value: 'Loose Petals' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Ayurvedic Detox Kahwa Tea',
    slug: 'ayurvedic-detox-kahwa-tea',
    description: 'Traditional Kashmiri Kahwa green tea enriched with saffron threads, cardamom, cinnamon, and crushed almonds. Best morning detox drink.',
    price: 380,
    purchasePrice: 210,
    stock: 90,
    sku: 'RA-TEA-ADK23',
    categorySlug: 'organic-herbs-teas',
    images: ['/assets/images/products/detox_kahwa_tea.webp'],
    tags: ['kahwa', 'detox', 'saffron tea', 'green tea'],
    attributes: [{ key: 'Weight', value: '100g' }, { key: 'Servings', value: '40 Cups' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Pure Dried Chamomile Flowers',
    slug: 'pure-dried-chamomile-flowers',
    description: 'Premium whole chamomile flower buds. Steep a cup before bedtime to promote deep, relaxing sleep and ease digestive discomfort.',
    price: 450,
    purchasePrice: 270,
    stock: 50,
    sku: 'RA-TEA-DCF24',
    categorySlug: 'organic-herbs-teas',
    images: ['/assets/images/products/dried_chamomile_flowers.webp'],
    tags: ['chamomile', 'sleep aid', 'herbal tea', 'loose flower'],
    attributes: [{ key: 'Weight', value: '50g' }, { key: 'Form', value: 'Whole Buds' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Organic Lemongrass Herbal Tea',
    slug: 'organic-lemongrass-herbal-tea',
    description: 'Zesty, citrusy herbal tea cut from dried organic lemongrass blades. Refreshing caffeine-free detox tea that stimulates digestion.',
    price: 190,
    purchasePrice: 100,
    stock: 120,
    sku: 'RA-TEA-LGT25',
    categorySlug: 'organic-herbs-teas',
    images: ['/assets/images/products/lemongrass_herbal_tea.webp'],
    tags: ['lemongrass', 'herbal tea', 'caffeine free', 'digestion'],
    attributes: [{ key: 'Weight', value: '80g' }, { key: 'Form', value: 'Loose Cut Tea' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: false
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

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Query all categories
    const categoriesList = await Category.find({});
    console.log(`Fetched ${categoriesList.length} categories from DB.`);

    const categoryMap = {};
    categoriesList.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with proper Category ObjectIds
    const finalProducts = productsData.map(p => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }
      const pCopy = { ...p };
      pCopy.categories = [categoryId];
      delete pCopy.categorySlug;
      return pCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);
    insertResult.forEach((prod, i) => {
      console.log(`[Product ${i+1}] Name: "${prod.name}", SKU: "${prod.sku}"`);
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
