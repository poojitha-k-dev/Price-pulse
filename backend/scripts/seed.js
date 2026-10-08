require('dotenv').config();
const sequelize = require('../config/database');
const Category = require('../models/Category');
const Product = require('../models/Product');

// ─── 50 Categories ───────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Fresh Vegetables', slug: 'fresh-vegetables', icon: '🥦', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
  { name: 'Fresh Fruits', slug: 'fresh-fruits', icon: '🍎', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400' },
  { name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥛', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { name: 'Bread & Bakery', slug: 'bread-bakery', icon: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { name: 'Beverages', slug: 'beverages', icon: '🧃', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400' },
  { name: 'Snacks & Chips', slug: 'snacks-chips', icon: '🍟', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
  { name: 'Rice & Grains', slug: 'rice-grains', icon: '🌾', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Atta & Flour', slug: 'atta-flour', icon: '🌾', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { name: 'Pulses & Lentils', slug: 'pulses-lentils', icon: '🫘', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
  { name: 'Oils & Ghee', slug: 'oils-ghee', icon: '🫙', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { name: 'Spices & Masala', slug: 'spices-masala', icon: '🌶️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
  { name: 'Tea & Coffee', slug: 'tea-coffee', icon: '☕', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { name: 'Breakfast Cereals', slug: 'breakfast-cereals', icon: '🥣', image: 'https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?w=400' },
  { name: 'Noodles & Pasta', slug: 'noodles-pasta', icon: '🍜', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
  { name: 'Biscuits & Cookies', slug: 'biscuits-cookies', icon: '🍪', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400' },
  { name: 'Chocolates & Candy', slug: 'chocolates-candy', icon: '🍫', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400' },
  { name: 'Ice Cream & Frozen', slug: 'ice-cream-frozen', icon: '🍦', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400' },
  { name: 'Meat & Seafood', slug: 'meat-seafood', icon: '🍗', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { name: 'Packaged Foods', slug: 'packaged-foods', icon: '📦', image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400' },
  { name: 'Sauces & Condiments', slug: 'sauces-condiments', icon: '🧴', image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400' },
  { name: 'Baby & Kids', slug: 'baby-kids', icon: '👶', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' },
  { name: 'Personal Care', slug: 'personal-care', icon: '🧴', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400' },
  { name: 'Hair Care', slug: 'hair-care', icon: '💆', image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400' },
  { name: 'Skin Care', slug: 'skin-care', icon: '✨', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
  { name: 'Oral Care', slug: 'oral-care', icon: '🦷', image: 'https://images.unsplash.com/photo-1609840114035-3c981b3f6ebe?w=400' },
  { name: 'Household Cleaners', slug: 'household-cleaners', icon: '🧹', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
  { name: 'Laundry Care', slug: 'laundry-care', icon: '👕', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400' },
  { name: 'Pooja & Spiritual', slug: 'pooja-spiritual', icon: '🪔', image: 'https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=400' },
  { name: 'Pet Supplies', slug: 'pet-supplies', icon: '🐾', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400' },
  { name: 'Stationery & Office', slug: 'stationery-office', icon: '📝', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400' },
  { name: 'Kitchen Essentials', slug: 'kitchen-essentials', icon: '🍳', image: 'https://images.unsplash.com/photo-1556909114-5b9b4d93d0d9?w=400' },
  { name: 'Pickles & Jam', slug: 'pickles-jam', icon: '🫙', image: 'https://images.unsplash.com/photo-1557318041-1ce374d55ebf?w=400' },
  { name: 'Dry Fruits & Nuts', slug: 'dry-fruits-nuts', icon: '🥜', image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400' },
  { name: 'Sugar & Sweeteners', slug: 'sugar-sweeteners', icon: '🍬', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
  { name: 'Salt & Vinegar', slug: 'salt-vinegar', icon: '🧂', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400' },
  { name: 'Papad & Fryums', slug: 'papad-fryums', icon: '🫓', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
  { name: 'Juices & Drinks', slug: 'juices-drinks', icon: '🥤', image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400' },
  { name: 'Energy & Health Drinks', slug: 'energy-health-drinks', icon: '⚡', image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400' },
  { name: 'Organic & Natural', slug: 'organic-natural', icon: '🌿', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
  { name: 'Frozen Vegetables', slug: 'frozen-vegetables', icon: '❄️', image: 'https://images.unsplash.com/photo-1585237017125-24baf8d7406f?w=400' },
  { name: 'Canned & Tinned', slug: 'canned-tinned', icon: '🥫', image: 'https://images.unsplash.com/photo-1564835222827-d83a3d33e3f7?w=400' },
  { name: 'Cheese & Paneer', slug: 'cheese-paneer', icon: '🧀', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { name: 'Yoghurt & Curd', slug: 'yoghurt-curd', icon: '🍶', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { name: 'Chips & Namkeen', slug: 'chips-namkeen', icon: '🥨', image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400' },
  { name: 'Herbal & Wellness', slug: 'herbal-wellness', icon: '🌱', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
  { name: 'Ghee & Butter', slug: 'ghee-butter', icon: '🧈', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { name: 'Ready to Cook', slug: 'ready-to-cook', icon: '🍲', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400' },
  { name: 'Ready to Eat', slug: 'ready-to-eat', icon: '🥡', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
  { name: 'Sweets & Mithai', slug: 'sweets-mithai', icon: '🍮', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
  { name: 'Bath & Body', slug: 'bath-body', icon: '🛁', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' }
];

// ─── Product Data Templates ───────────────────────────────────────
const UNSPLASH_IMAGES = {
  'fresh-vegetables': [
    'https://images.unsplash.com/photo-1518977676405-7a1db8f5a0a7?w=300',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300',
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300',
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300',
    'https://images.unsplash.com/photo-1557844352-761f2565b576?w=300',
    'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300',
    'https://images.unsplash.com/photo-1591189824344-9b72e9eb5db4?w=300',
    'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=300'
  ],
  'fresh-fruits': [
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300',
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
    'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300',
    'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
    'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300',
    'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300'
  ],
  default: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
    'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=300',
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300',
    'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=300'
  ]
};

const BRANDS = ['Amul', 'Britannia', 'Nestlé', 'ITC', 'HUL', 'Dabur', 'Godrej', 'Patanjali', 'Mother Dairy', 'Haldiram\'s',
  'MDH', 'Everest', 'Tata', 'Parle', 'Maaza', 'Tropicana', 'Real', 'Minute Maid', 'PepsiCo', 'Coca-Cola',
  'Lay\'s', 'Kurkure', 'Bikaji', 'Bingo', 'Maggi', 'Yippee!', 'Knorr', 'Catch', 'MTR', 'Aashirvaad',
  'Fortune', 'Saffola', 'Sundrop', 'Gemini', 'Postman', 'India Gate', 'Kohinoor', 'Daawat', 'Organic India', 'FabIndia',
  'Himalaya', 'Mamaearth', 'WOW', 'Dove', 'Pantene', 'Head & Shoulders', 'Clinic Plus', 'Sunsilk', 'Vatika', 'Bajaj'
];

const DELIVERY_TIMES = ['8 mins', '10 mins', '12 mins', '15 mins', '18 mins', '20 mins'];
const UNITS = ['500g', '1kg', '2kg', '5kg', '250g', '100g', '200ml', '500ml', '1L', '2L', '6 pcs', '12 pcs', '1 pc', '250ml', '750ml'];

// Product templates per category (expanded to generate 500+ per category)
const PRODUCT_TEMPLATES = {
  'fresh-vegetables': [
    'Tomato', 'Onion', 'Potato', 'Carrot', 'Capsicum', 'Spinach', 'Cauliflower', 'Broccoli', 'Cabbage', 'Cucumber',
    'Bitter Gourd', 'Bottle Gourd', 'Ridge Gourd', 'Snake Gourd', 'Ladies Finger', 'Drumstick', 'Raw Banana', 'Yam',
    'Radish', 'Turnip', 'Beetroot', 'Sweet Corn', 'Baby Corn', 'Peas', 'French Beans', 'Cluster Beans', 'Broad Beans',
    'Methi Leaves', 'Coriander', 'Mint', 'Curry Leaves', 'Pudina', 'Dill Leaves', 'Spring Onion', 'Leek', 'Celery',
    'Lettuce', 'Iceberg Lettuce', 'Arugula', 'Kale', 'Swiss Chard', 'Bok Choy', 'Zucchini', 'Bell Pepper Red',
    'Bell Pepper Yellow', 'Bell Pepper Green', 'Cherry Tomato', 'Pumpkin', 'Ash Gourd', 'Raw Papaya', 'Jackfruit',
    'Green Chilli', 'Red Chilli', 'Garlic', 'Ginger', 'Turmeric Root', 'Galangal', 'Lemongrass', 'Artichoke',
    'Asparagus', 'Avocado', 'Brussels Sprouts', 'Edamame', 'Endive', 'Fennel', 'Kohlrabi', 'Parsnip', 'Watercress',
    'Chives', 'Tarragon', 'Basil', 'Rosemary', 'Thyme', 'Parsley', 'Oregano', 'Sage', 'Bay Leaves'
  ],
  'fresh-fruits': [
    'Apple Shimla', 'Apple Fuji', 'Banana', 'Mango Alphonso', 'Mango Kesar', 'Orange', 'Mosambi', 'Papaya',
    'Guava', 'Pomegranate', 'Watermelon', 'Muskmelon', 'Pineapple', 'Grapes Black', 'Grapes Green', 'Grapes Red',
    'Strawberry', 'Blueberry', 'Raspberry', 'Blackberry', 'Kiwi', 'Pear', 'Peach', 'Plum', 'Apricot', 'Cherry',
    'Lemon', 'Lime', 'Grapefruit', 'Tangerine', 'Mandarin', 'Clementine', 'Jackfruit', 'Lychee', 'Longan',
    'Dragon Fruit', 'Passion Fruit', 'Star Fruit', 'Sapota', 'Custard Apple', 'Jamun', 'Gooseberry', 'Tamarind',
    'Coconut', 'Tender Coconut', 'Fig', 'Date', 'Rambutan', 'Mangosteen', 'Durian', 'Persimmon', 'Quince',
    'Mulberry', 'Elderberry', 'Currant', 'Cranberry', 'Honeydew', 'Cantaloupe', 'Boysenberry', 'Loganberry',
    'Kumquat', 'Pomelo', 'Ugli Fruit', 'Feijoa', 'Ackee', 'Breadfruit', 'Carambola', 'Jujube', 'Loquat', 'Marula'
  ],
  'dairy-eggs': [
    'Full Cream Milk', 'Toned Milk', 'Double Toned Milk', 'Skimmed Milk', 'Buffalo Milk', 'A2 Milk', 'Oat Milk',
    'Almond Milk', 'Soy Milk', 'Coconut Milk', 'Paneer 200g', 'Paneer 500g', 'Low Fat Paneer', 'Tofu',
    'Butter Salted', 'Butter Unsalted', 'White Butter', 'Cream', 'Heavy Cream', 'Whipping Cream', 'Fresh Cream',
    'Ghee 500ml', 'Ghee 1L', 'A2 Ghee', 'Cheese Slices', 'Cheddar Cheese', 'Mozzarella Cheese', 'Parmesan',
    'Cream Cheese', 'Processed Cheese', 'Cottage Cheese', 'Feta Cheese', 'Brie', 'Gouda', 'Emmental',
    'Curd 400g', 'Curd 1kg', 'Greek Yoghurt', 'Flavored Yoghurt Mango', 'Flavored Yoghurt Strawberry',
    'Lassi Sweet', 'Lassi Salted', 'Buttermilk', 'Chaas', 'Raita', 'Mishti Doi', 'Dahi',
    'Eggs 6pc', 'Eggs 12pc', 'Eggs 30pc', 'Brown Eggs', 'Free Range Eggs', 'Omega Eggs', 'Duck Eggs',
    'Condensed Milk', 'Evaporated Milk', 'Khoya', 'Mawa', 'Rabri', 'Shrikhand', 'Basundi', 'Milk Powder',
    'Protein Shake', 'Smoothie Mix', 'Probiotic Drink', 'Kefir', 'Sour Cream', 'Crème Fraîche', 'Clotted Cream'
  ],
  'beverages': [
    'Coca Cola 750ml', 'Pepsi 750ml', 'Sprite 750ml', 'Limca 750ml', 'Thums Up 750ml', 'Mountain Dew 750ml',
    'Fanta Orange 750ml', '7UP 750ml', 'Mirinda 750ml', 'Sting Energy 250ml', 'Red Bull 250ml',
    'Monster Energy 500ml', 'Bisleri Water 1L', 'Kinley Water 1L', 'Bailley Water 1L', 'Aquafina 1L',
    'Mineral Water 500ml', 'Sparkling Water 500ml', 'Coconut Water 250ml', 'Tender Coconut Water',
    'Maaza Mango 250ml', 'Slice Mango 250ml', 'Frooti Mango 200ml', 'Paperboat Aamras', 'Paperboat Rose Sharbat',
    'Real Guava Juice 1L', 'Real Orange Juice 1L', 'Tropicana Apple 1L', 'Minute Maid Pulpy Orange 1L',
    'Mixed Fruit Juice 1L', 'Pomegranate Juice 1L', 'Cranberry Juice 1L', 'Tomato Juice 1L',
    'Amul Kool Milk', 'Complan Chocolate 200ml', 'Horlicks 200ml', 'Boost 200ml', 'Bournvita 200ml',
    'Nescafé Ready 180ml', 'Tata Tea Gold 500ml', 'Masala Chai 250ml', 'Green Tea 500ml',
    'Nimbu Pani 200ml', 'Jaljeera Drink', 'Rooh Afza 750ml', 'Sharbat E Gulab', 'Thandai Mix',
    'Lassi Drink 250ml', 'Chaas 500ml', 'Cold Coffee 200ml', 'Iced Tea Lemon 500ml', 'Iced Tea Peach 500ml',
    'Mango Shake 200ml', 'Strawberry Shake 200ml', 'Chocolate Milk 200ml', 'Vanilla Shake 200ml',
    'Sugarcane Juice 250ml', 'Jamun Juice 500ml', 'Bael Juice 500ml', 'Karela Juice 500ml', 'Amla Juice 500ml',
    'Aloe Vera Juice 1L', 'Giloy Juice 500ml', 'Wheatgrass Juice 500ml', 'Ash Gourd Juice 500ml',
    'Ginger Lemon Drink 250ml', 'Turmeric Latte Mix', 'Masala Nimbu Pani 250ml', 'Thandai Premix'
  ],
  'snacks-chips': [
    "Lay's Classic Salted 26g", "Lay's American Style Cream Onion 26g", "Lay's Spanish Tomato Tango 26g",
    'Kurkure Masala Munch 90g', 'Kurkure Chilli Chatka 90g', 'Kurkure Noodle Masala 90g',
    'Bingo Mad Angles Original 72g', 'Bingo Tedhe Medhe 65g', 'Bingo Original Style Sinfully Salted 52g',
    'Haldiram Aloo Bhujia 200g', 'Haldiram Moong Dal 200g', 'Haldiram Bhel Puri 150g', 'Haldiram Chana Dal 200g',
    'Bikaji Bhunja 200g', 'Bikaji Chana Dal 200g', 'Bikaji Khatta Meetha 200g', 'Bikaji Namkeen 200g',
    'Parle Monaco 300g', 'Parle Hide & Seek 75g', 'Parle 20-20 Butter Cookies', 'Parle G Original',
    'Britannia Treat Biscuits', 'Britannia Digestive Marie', 'Britannia Nutrichoice', 'Britannia Good Day',
    'McVities Digestive Original', 'McVities Oat Cracker', 'Oreo Original 120g', 'Oreo Double Stuff 120g',
    'Pringles Original 107g', 'Pringles Sour Cream & Onion 107g', 'Pringles Cheese 107g',
    'Doritos Nacho Cheese 55g', 'Doritos Spicy 55g', 'Ruffles American Sour Cream 50g',
    'Too Yumm Multigrain Crisps', 'Too Yumm Veggie Stars', 'Cornitos Nacho Crisps',
    'Popcorn Butter 50g', 'Popcorn Cheese 50g', 'Popcorn Caramel 50g', 'Microwave Popcorn Act II',
    'Roasted Peanuts Salted 200g', 'Roasted Chickpeas 150g', 'Trail Mix 200g',
    'Protein Bar Chocolate', 'Fiber Bar Apple', 'Granola Bar Honey Oat', 'Energy Bar Peanut Butter',
    'Rice Cakes Plain', 'Rice Cakes Caramel', 'Wheat Thins Original', 'Pretzel Sticks 150g',
    'Nachos Plain 150g', 'Nachos Cheese 150g', 'Salted Crackers 200g', 'Ryvita Crispbread',
    'Lotus Biscoff 250g', 'Gaufre Waffle Biscuits', 'Stroopwafel 200g', 'Baklava Mix 200g',
    'Murukku 200g', 'Chakli 200g', 'Thattai 200g', 'Ribbon Pakoda 150g', 'Mixture 200g',
    'Sev Salted 200g', 'Farsan Mix 200g', 'Chiwda 200g', 'Poha Chiwda 200g', 'Mathri 200g'
  ]
};

// Generic product name generator for categories without templates
function generateProductNames(categoryName, count = 500) {
  const adjectives = ['Premium', 'Classic', 'Original', 'Fresh', 'Natural', 'Organic', 'Pure', 'Select', 'Choice', 'Special',
    'Regular', 'Standard', 'Deluxe', 'Ultra', 'Pro', 'Gold', 'Silver', 'Platinum', 'Supreme', 'Royal',
    'Heritage', 'Traditional', 'Authentic', 'Artisan', 'Craft', 'Signature', 'Reserve', 'Limited', 'Exclusive'];
  const sizes = ['50g', '100g', '200g', '250g', '500g', '1kg', '2kg', '5kg', '100ml', '200ml', '500ml', '1L', '2L',
    'Small', 'Medium', 'Large', 'XL', 'Pack of 3', 'Pack of 6', 'Pack of 12', 'Family Pack', 'Value Pack', 'Economy Pack'];

  const names = [];
  const catWords = categoryName.split(/[\s&-]+/).filter(w => w.length > 2);

  for (let i = 0; i < count; i++) {
    const brand = BRANDS[i % BRANDS.length];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const catWord = catWords[Math.floor(Math.random() * catWords.length)] || 'Product';
    names.push(`${brand} ${adj} ${catWord} ${size}`);
  }
  return names;
}

function randBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randRating() {
  return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
}

function generatePrices(basePrice) {
  const blinkit = Math.round(basePrice * randBetween(0.92, 1.08) * 100) / 100;
  const zepto = Math.round(basePrice * randBetween(0.90, 1.06) * 100) / 100;
  const swiggy = Math.round(basePrice * randBetween(0.93, 1.10) * 100) / 100;
  const mrpMultiplier = randBetween(1.1, 1.3);

  return {
    blinkitPrice: blinkit,
    blinkitMrp: Math.round(blinkit * mrpMultiplier * 100) / 100,
    blinkitDiscount: randInt(5, 25),
    blinkitRating: randRating(),
    blinkitDelivery: DELIVERY_TIMES[randInt(0, 3)],
    zeptoPrice: zepto,
    zeptoMrp: Math.round(zepto * mrpMultiplier * 100) / 100,
    zeptoDiscount: randInt(5, 30),
    zeptoRating: randRating(),
    zeptoDelivery: DELIVERY_TIMES[randInt(0, 3)],
    swiggyPrice: swiggy,
    swiggyMrp: Math.round(swiggy * mrpMultiplier * 100) / 100,
    swiggyDiscount: randInt(0, 20),
    swiggyRating: randRating(),
    swiggyDelivery: DELIVERY_TIMES[randInt(1, 5)]
  };
}

function getImage(slug, index) {
  const imgs = UNSPLASH_IMAGES[slug] || UNSPLASH_IMAGES.default;
  return imgs[index % imgs.length];
}

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB Connected');

    await sequelize.sync({ force: true });
    console.log('✅ Tables created');

    // Insert categories
    const createdCats = await Category.bulkCreate(CATEGORIES);
    console.log(`✅ ${createdCats.length} categories created`);

    // Generate and insert products for each category
    let totalProducts = 0;
    const BATCH_SIZE = 500;

    for (const cat of createdCats) {
      const templateNames = PRODUCT_TEMPLATES[cat.slug] || [];
      const allNames = [...templateNames];

      // Fill up to 500+ with generated names
      const needed = 500 - allNames.length;
      if (needed > 0) {
        allNames.push(...generateProductNames(cat.name, needed + 50));
      }

      const products = allNames.slice(0, 500).map((name, i) => {
        const basePrice = randBetween(15, 800);
        const prices = generatePrices(basePrice);
        return {
          name,
          brand: BRANDS[i % BRANDS.length],
          categoryId: cat.id,
          image: getImage(cat.slug, i),
          unit: UNITS[i % UNITS.length],
          description: `High quality ${name} from trusted brands. Fresh, authentic and delivered in minutes.`,
          tags: [cat.name.toLowerCase(), name.split(' ')[0].toLowerCase()],
          ...prices,
          isFeatured: i < 10,
          isPopular: i < 20
        };
      });

      // Batch insert
      for (let i = 0; i < products.length; i += BATCH_SIZE) {
        await Product.bulkCreate(products.slice(i, i + BATCH_SIZE));
      }

      totalProducts += products.length;
      console.log(`  ✅ ${cat.name}: ${products.length} products`);
    }

    console.log(`\n🎉 Seeding complete! ${totalProducts} products across ${createdCats.length} categories`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
