// Product name templates per category
const productTemplates = {
  "fresh-vegetables": {
    brands: ["Farm Fresh", "Organic Valley", "Nature's Basket", "Daily Fresh", "Green Farm", "Village Fresh", "Kisaan", "Hara Bhara", "Local Farm", "Pure Harvest"],
    items: ["Tomatoes", "Onions", "Potatoes", "Green Peas", "Carrots", "Spinach", "Cauliflower", "Broccoli", "Cucumber", "Capsicum", "Bitter Gourd", "Bottle Gourd", "Ridge Gourd", "Drumstick", "Cabbage", "Lettuce", "Celery", "Beetroot", "Radish", "Turnip", "Sweet Potato", "Yam", "Colocasia", "Elephant Yam", "Green Beans", "Cluster Beans", "Flat Beans", "Pumpkin", "Ash Gourd", "Snake Gourd", "Pointed Gourd", "Ivy Gourd", "Corn", "Baby Corn", "Cherry Tomatoes", "Roma Tomatoes", "Spring Onions", "Leeks", "Fennel", "Artichoke", "Zucchini", "Brinjal", "Lady Finger", "Green Chilli", "Red Chilli", "Yellow Bell Pepper", "Purple Cabbage", "Brussels Sprouts", "Kale", "Baby Spinach", "Arugula", "Pak Choi", "Chinese Cabbage", "Bok Choy",
    "Microgreens", "Edamame", "Taro Root", "Lotus Root", "Bamboo Shoots",
    "Water Chestnuts", "Jerusalem Artichoke", "Kohlrabi", "Celeriac", "Radicchio"],
    units: ["500g", "1kg", "250g", "2kg", "bunch", "packet"],
    basePrice: [20, 120]
  },
  "fresh-fruits": {
    brands: ["Fresh Picks", "Fruit Crown", "Nature's Delight", "Golden Harvest", "Tropical Fresh", "Himalayan Fruits", "Sun Valley", "Orchard Fresh", "Valley Gold", "Prime Fruits"],
    items: ["Apples", "Bananas", "Oranges", "Grapes", "Mangoes", "Watermelon", "Papaya", "Pineapple", "Pomegranate", "Guava", "Pear", "Peach", "Plum", "Litchi", "Kiwi", "Strawberries", "Blueberries", "Avocado", "Dragon Fruit", "Passion Fruit", "Jackfruit", "Custard Apple", "Star Fruit", "Fig", "Date", "Coconut", "Muskmelon", "Cantaloupe", "Honeydew", "Lemon", "Lime", "Grapefruit", "Sweet Lime", "Tangerine", "Clementine", "Raspberry", "Blackberry", "Gooseberry", "Mulberry", "Jamun", "Ber", "Chikoo", "Amla", "Tamarind", "Kokum", "Bael", "Wood Apple", "Persimmon", "Loquat", "Rambutan", "Soursop", "Longan", "Salak", "Mangosteen", "Durian", "Sweetsop", "Nashi Pear", "Yuzu", "Ugli Fruit", "Finger Lime", "Kiwano Melon", "Pineberry", "Cloudberry", "Marionberry", "Olallieberry", "Boysenberry", "Elderberry", "Huckleberry", "Serviceberry", "Saskatoon Berry", "Chokeberry", "Barberry"],
    units: ["500g", "1kg", "250g", "dozen", "pack"],
    basePrice: [30, 200]
  },
  "dairy-eggs": {
    brands: ["Amul", "Mother Dairy", "Nestle", "Go Cheese", "Britannia", "Heritage", "Thirumala", "Nandini", "Verka", "Milkfed"],
    items: ["Full Cream Milk", "Toned Milk", "Double Toned Milk", "Skimmed Milk", "Cow Milk", "Buffalo Milk", "Soy Milk", "Almond Milk", "Oat Milk", "Coconut Milk", "Butter", "White Butter", "Salted Butter", "Ghee", "Cow Ghee", "Paneer", "Curd", "Thick Curd", "Greek Yogurt", "Flavored Yogurt", "Buttermilk", "Lassi", "Mango Lassi", "Cheese Slices", "Processed Cheese", "Cheddar Cheese", "Mozzarella", "Cream Cheese", "Ricotta", "Cottage Cheese", "Whey Protein", "Condensed Milk", "Evaporated Milk", "Milk Powder", "Skimmed Milk Powder", "Eggs (6 pack)", "Eggs (12 pack)", "Eggs (30 pack)", "Free Range Eggs", "Organic Eggs", "Duck Eggs", "Quail Eggs", "Cream", "Heavy Cream", "Sour Cream", "Ice Cream Mix", "Custard", "Khoya", "Chena", "Raita", "Shrikhand", "Mishti Doi", "Dahi Vada", "Dahi Bhalla", "Dahi Puri", "Dahi Papdi Chaat", "Dahi Ke Kebab", "Dahi Arbi", "Dahi Baingan", "Dahi Aloo", "Dahi Matar", "Dahi Chicken", "Dahi Fish", "Dahi Prawns"],
    units: ["500ml", "1L", "200g", "400g", "pack"],
    basePrice: [25, 350]
  },
  "snacks-chips": {
    brands: ["Lay's", "Kurkure", "Haldirams", "Bingo", "Pringles", "Doritos", "Cheetos", "Act II", "Too Yumm", "Bikaji"],
    items: ["Classic Salted Chips", "Masala Chips", "Cream & Onion Chips", "Tomato Chips", "Peri Peri Chips", "Cheese & Herb Chips", "Barbeque Chips", "Sour Cream Chips", "Salt & Pepper Chips", "Ridge Chips", "Wavy Chips", "Baked Chips", "Multigrain Chips", "Veggie Chips", "Sweet Potato Chips", "Banana Chips", "Tapioca Chips", "Khakra", "Mathri", "Chakli", "Sev", "Bhujia", "Aloo Bhujia", "Moong Dal", "Chana Dal Snack", "Masala Peanuts", "Roasted Peanuts", "Chana Jor Garam", "Popcorn", "Cheese Popcorn", "Caramel Popcorn", "Nachos", "Tortilla Chips", "Pretzels", "Rice Cakes", "Corn Puffs", "Cheese Balls", "Ring Snacks", "Puffed Rice", "Murmura Mix", "Trail Mix", "Roasted Almonds Snack", "Roasted Cashews Snack", "Mixed Nuts Pack", "Granola Bars", "Protein Bars", "Energy Bars", "Cereal Bars", "Fruit & Nut Bars", "Muesli", "Oatmeal", "Porridge", "Breakfast Cereal", "Poha", "Upma", "Kuttu Atta", "Besan Chilla", "Pav Bhaji Masala", "Samosa Mix", "Pakora Mix", "Vada Pav Mix", "Dhokla Mix", "Kachori Mix", "Puri Atta", "Suji Halwa", "Besan Halwa", "Jalebi Mix", "Rasgulla Mix", "Sandesh Mix", "Kheer Mix", "Rabri Mix", "Gulab Jamun Mix", "Jammun Mix", "Imarti Mix", "Kaju Katli Mix", "Barfi Mix", "Laddu Mix", "Halwa Mix", "Peda Mix", "Chikki Mix", "Ladoo Mix", "Kulfi Mix", "Falooda Mix", "Shrikhand Mix", "Rasmalai Mix", "Gajar Halwa Mix", "Moong Dal Halwa Mix", "Chana Halwa Mix", "Kheer Mix", "Rabri Mix", "Kheer Mix", "Rabri Mix", "Kheer Mix", "Rab"],
    units: ["26g", "50g", "90g", "150g", "200g"],
    basePrice: [10, 120]
  },
  "beverages": {
    brands: ["Tropicana", "Real", "B Natural", "Paper Boat", "Raw Pressery", "Minute Maid", "Maaza", "Frooti", "Slice", "Appy"],
    items: ["Orange Juice", "Apple Juice", "Mango Juice", "Mixed Fruit Juice", "Guava Juice", "Pomegranate Juice", "Grape Juice", "Pineapple Juice", "Lychee Juice", "Cranberry Juice", "Tomato Juice", "Carrot Juice", "Beet Juice", "Green Juice", "Coconut Water", "Tender Coconut Water", "Lemon Water", "Rose Sharbat", "Jaljeera", "Aam Panna", "Bael Sharbat", "Tamarind Drink", "Sugarcane Juice", "Energy Drink", "Sports Drink", "Cola", "Diet Cola", "Lemonade", "Ginger Ale", "Tonic Water", "Soda Water", "Sparkling Water", "Still Water", "Flavored Water", "Iced Tea", "Cold Coffee", "Chocolate Milk Drink", "Flavored Milk", "Lassi Drink", "Chaas", "Aloe Vera Drink", "Kombucha", "Wheatgrass Shot", "Immunity Booster Drink", "Protein Shake RTD", "Meal Replacement Drink", "Detox Water", "Herbal Drink", "Fruit Punch", "Mocktail Mix", "Cocktail Mix", "Virgin Mojito Mix", "Virgin Pina Colada Mix", "Virgin Margarita Mix"],
    units: ["200ml", "250ml", "500ml", "1L", "1.5L"],
    basePrice: [15, 150]
  },
  // Add this inside productTemplates object in productGenerator.js

  "tea-coffee": {
  brands: ["Tata Tea", "Red Label", "Nescafe", "Bru", "Davidoff", "Blue Tokai", "Third Wave", "Rage Coffee", "Continental", "McCafe"],
  items: [
    "Masala Chai", "Darjeeling Tea", "Assam Tea", "Green Tea", "Tulsi Green Tea",
    "Ginger Lemon Tea", "Chamomile Tea", "Earl Grey", "Oolong Tea", "White Tea",
    "Instant Coffee", "Filter Coffee", "Espresso Powder", "Cold Brew Coffee", "Cappuccino Mix",
    "Latte Mix", "Mocha Mix", "Hazelnut Coffee", "French Press Coffee", "Pour Over Coffee",
    "Kashmiri Kahwa", "Rose Tea", "Hibiscus Tea", "Peppermint Tea", "Lemongrass Tea",
    "Black Tea Bags", "Green Tea Bags", "Herbal Tea Mix", "Immunity Tea", "Sleep Tea",
    "Elaichi Tea", "Brahmi Tea", "Ashwagandha Tea", "Moringa Tea", "Detox Tea"
  ],
  units: ["100g", "250g", "500g", "50 bags", "200g"],
  basePrice: [80, 800]
},

  "biscuits-cookies": {
  brands: ["Britannia", "Parle", "McVities", "Oreo", "Sunfeast", "Priyagold", "Unibic", "Bakers", "Julie's", "Anmol"],
  items: [
    "Oreo Original", "Oreo Vanilla", "Bourbon Biscuits", "Marie Gold", "Good Day Butter",
    "Good Day Cashew", "Monaco Salted", "Krackjack", "50-50", "Tiger Glucose",
    "Digestive Biscuits", "Oat Digestive", "Nutrichoice", "Hobnobs", "Rich Tea",
    "Chocolate Chip Cookies", "Butter Cookies", "Almond Cookies", "Coconut Cookies", "Ragi Cookies",
    "Multigrain Cookies", "Jaggery Cookies", "Dark Chocolate Cookies", "Oatmeal Raisin", "Peanut Butter Cookies",
    "Cream Cracker", "Water Biscuits", "Rice Biscuits", "Cheese Crackers", "Pepper Crackers",
    "Hide & Seek", "Choco Fills", "Jim Jam", "Treat", "Milk Bikis"
  ],
  units: ["100g", "150g", "200g", "300g", "pack of 3"],
  basePrice: [20, 200]
},

  "oils-ghee": {
  brands: ["Fortune", "Saffola", "Dhara", "Patanjali", "Aashirvaad", "Sundrop", "Emami", "Borges", "KLF Coconad", "Ananda"],
  items: [
    "Sunflower Oil", "Refined Sunflower Oil", "Soybean Oil", "Groundnut Oil", "Mustard Oil",
    "Kachi Ghani Mustard", "Coconut Oil", "Virgin Coconut Oil", "Rice Bran Oil", "Canola Oil",
    "Olive Oil Extra Virgin", "Pomace Olive Oil", "Sesame Oil", "Flaxseed Oil", "Avocado Oil",
    "Cow Ghee", "Buffalo Ghee", "Desi Ghee", "A2 Ghee", "Cultured Ghee",
    "Vanaspati", "Dalda", "Palm Oil", "Blended Vegetable Oil", "Cold Pressed Groundnut Oil",
    "Cold Pressed Coconut Oil", "Hemp Seed Oil", "Walnut Oil", "Almond Oil", "MCT Oil"
  ],
  units: ["500ml", "1L", "2L", "5L", "500g"],
  basePrice: [100, 1200]
},

  "spices-masala": {
  brands: ["MDH", "Everest", "Catch", "Badshah", "Eastern", "Patanjali", "Organic India", "24 Mantra", "Nature's Best", "ITC"],
  items: [
    "Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Cumin Powder", "Garam Masala",
    "Kitchen King Masala", "Chaat Masala", "Pav Bhaji Masala", "Biryani Masala", "Rajma Masala",
    "Chole Masala", "Sambar Powder", "Rasam Powder", "Curry Powder", "Meat Masala",
    "Chicken Masala", "Fish Masala", "Dal Makhani Masala", "Paneer Masala", "Mutter Masala",
    "Whole Black Pepper", "Whole Cumin", "Whole Coriander", "Cardamom", "Cloves",
    "Cinnamon Sticks", "Bay Leaves", "Star Anise", "Nutmeg", "Mace",
    "Mustard Seeds", "Fennel Seeds", "Carom Seeds", "Fenugreek Seeds", "Kalonji",
    "Asafoetida", "Dry Mango Powder", "Pomegranate Powder", "Kasuri Methi", "Black Salt"
  ],
  units: ["100g", "200g", "500g", "50g", "1kg"],
  basePrice: [30, 400]
},

  "chocolates-candy": {
  brands: ["Cadbury", "Nestle", "Ferrero", "Lindt", "Amul", "Hershey's", "Mars", "Toblerone", "Snickers", "KitKat"],
  items: [
    "Dairy Milk", "Dairy Milk Silk", "5 Star", "Perk", "Gems",
    "KitKat", "KitKat Dark", "Munch", "Milkybar", "Bar One",
    "Ferrero Rocher", "Raffaello", "Kinder Joy", "Kinder Bueno", "Nutella",
    "Snickers", "Twix", "Bounty", "Mars Bar", "Milky Way",
    "Lindt 70% Dark", "Lindt Milk", "Lindt Excellence", "Toblerone", "After Eight",
    "Amul Dark Chocolate", "Amul Milk Chocolate", "Truffle Box", "Chocolate Coins", "Choco Pie",
    "Éclairs", "Melody", "Mango Bite", "Alpenliebe", "Center Fresh"
  ],
  units: ["50g", "100g", "200g", "pack", "box"],
  basePrice: [30, 800]
},

  "meat-seafood": {
  brands: ["FreshToHome", "Licious", "Zappfresh", "Godrej Yummiez", "Venky's", "Suguna", "WayCool", "TenderCuts", "BigBasket", "Nandu's"],
  items: [
    "Chicken Breast", "Chicken Thighs", "Chicken Drumsticks", "Chicken Wings", "Whole Chicken",
    "Chicken Keema", "Chicken Curry Cut", "Chicken Boneless", "Chicken Liver", "Chicken Gizzard",
    "Mutton Curry Cut", "Mutton Keema", "Mutton Chops", "Mutton Leg", "Mutton Ribs",
    "Rohu Fish", "Catla Fish", "Hilsa Fish", "Pomfret", "Surmai",
    "Prawns Small", "Prawns Medium", "Prawns Large", "Tiger Prawns", "King Prawns",
    "Salmon Fillet", "Tuna Steak", "Mackerel", "Sardines", "Red Snapper",
    "Crab", "Lobster", "Squid", "Mussels", "Clams"
  ],
  units: ["250g", "500g", "1kg", "pack"],
  basePrice: [150, 1500]
},

  "noodles-pasta": {
  brands: ["Maggi", "Yippee!", "Knorr", "Ching's", "Wai Wai", "Nissin", "Bosch", "Barilla", "Del Monte", "DiSano"],
  items: [
    "Maggi 2 Minute Noodles", "Maggi Masala", "Maggi Chicken", "Maggi Atta Noodles", "Maggi Oats",
    "Yippee Classic", "Yippee Magic Masala", "Yippee Mood Masala", "Yippee Long Slurpy", "Yippee Tricolor",
    "Ching's Schezwan", "Ching's Manchurian", "Ching's Hakka Noodles", "Ching's Desi Chinese", "Ching's Hot Garlic",
    "Penne Pasta", "Fusilli Pasta", "Spaghetti", "Fettuccine", "Linguine",
    "Macaroni", "Farfalle", "Rigatoni", "Lasagna Sheets", "Orzo",
    "Rice Noodles", "Glass Noodles", "Egg Noodles", "Udon Noodles", "Soba Noodles",
    "Ramen Pack", "Pad Thai Noodles", "Vermicelli", "Sevai", "Rice Vermicelli"
  ],
  units: ["70g", "140g", "400g", "500g", "pack of 4"],
  basePrice: [15, 300]
},

  "dry-fruits-nuts": {
  brands: ["Happilo", "Rostaa", "Nutraj", "Tulsi", "Looms & Weaves", "Farmley", "Borges", "Carnival", "True Elements", "Vedaka"],
  items: [
    "Almonds", "Cashews", "Pistachios", "Walnuts", "Macadamia Nuts",
    "Hazelnuts", "Brazil Nuts", "Pine Nuts", "Pecans", "Peanuts Roasted",
    "Raisins", "Golden Raisins", "Sultanas", "Dried Cranberries", "Dried Blueberries",
    "Dried Apricots", "Dried Figs", "Dried Dates", "Prunes", "Dried Mango",
    "Dried Kiwi", "Dried Pineapple", "Dried Papaya", "Mixed Dried Fruits", "Trail Mix",
    "Foxnuts Makhana", "Roasted Foxnuts", "Pumpkin Seeds", "Sunflower Seeds", "Flax Seeds",
    "Chia Seeds", "Hemp Seeds", "Sesame Seeds", "Watermelon Seeds", "Mixed Seeds"
  ],
  units: ["100g", "200g", "250g", "500g", "1kg"],
  basePrice: [80, 1200]
},

  "health-nutrition": {
  brands: ["Optimum Nutrition", "MuscleBlaze", "MyProtein", "Ensure", "Horlicks", "Complan", "Bournvita", "Protinex", "Oziva", "HealthKart"],
  items: [
    "Whey Protein Chocolate", "Whey Protein Vanilla", "Whey Protein Strawberry", "Whey Isolate", "Casein Protein",
    "Mass Gainer", "Weight Gainer", "Lean Mass Gainer", "Creatine Monohydrate", "BCAA Powder",
    "Pre Workout", "Post Workout", "Multivitamin Men", "Multivitamin Women", "Vitamin C Tablets",
    "Vitamin D3", "Vitamin B12", "Omega 3 Fish Oil", "Calcium Tablets", "Iron Supplement",
    "Protein Bar Chocolate", "Protein Bar Peanut Butter", "Granola Bar", "Energy Bar", "Fiber Bar",
    "Apple Cider Vinegar", "Ashwagandha Capsules", "Turmeric Curcumin", "Spirulina", "Moringa Powder",
    "Collagen Powder", "Biotin Tablets", "Zinc Supplement", "Magnesium", "Probiotics"
  ],
  units: ["500g", "1kg", "2kg", "60 tabs", "30 caps"],
  basePrice: [200, 4000]
},

  "skin-care": {
  brands: ["Nivea", "Neutrogena", "Cetaphil", "The Ordinary", "Minimalist", "Dot & Key", "Plum", "Mamaearth", "WOW", "Lotus"],
  items: [
    "Face Wash Gel", "Foaming Face Wash", "Cream Face Wash", "Micellar Water", "Cleansing Oil",
    "Moisturizer SPF 50", "Night Cream", "Day Cream", "BB Cream", "CC Cream",
    "Vitamin C Serum", "Hyaluronic Acid Serum", "Retinol Serum", "Niacinamide Serum", "Salicylic Acid Serum",
    "Sunscreen SPF 30", "Sunscreen SPF 50", "Sunscreen SPF 70", "Tinted Sunscreen", "Mineral Sunscreen",
    "Face Mask Clay", "Sheet Mask", "Peel Off Mask", "Sleeping Mask", "Charcoal Mask",
    "Eye Cream", "Under Eye Patches", "Lip Balm", "Lip Scrub", "Hand Cream",
    "Body Lotion", "Body Butter", "Stretch Mark Cream", "Whitening Cream", "Anti-Aging Cream"
  ],
  units: ["50ml", "100ml", "200ml", "30ml", "pack"],
  basePrice: [100, 2000]
},

  "hair-care": {
  brands: ["Pantene", "Head & Shoulders", "Dove", "TRESemmé", "L'Oreal", "Himalaya", "Biotique", "WOW", "Mamaearth", "Beardo"],
  items: [
    "Anti-Dandruff Shampoo", "Moisturizing Shampoo", "Volumizing Shampoo", "Color Protection Shampoo", "Keratin Shampoo",
    "Argan Oil Shampoo", "Tea Tree Shampoo", "Biotin Shampoo", "Onion Shampoo", "Bhringraj Shampoo",
    "Deep Conditioning Mask", "Leave-In Conditioner", "Rinse Out Conditioner", "Hair Serum", "Hair Oil",
    "Coconut Hair Oil", "Almond Hair Oil", "Castor Oil", "Amla Oil", "Bhringraj Oil",
    "Hair Spray", "Dry Shampoo", "Hair Gel", "Hair Wax", "Hair Mousse",
    "Heat Protectant Spray", "Frizz Control Cream", "Curl Defining Cream", "Hair Straightening Cream", "Hair Mask",
    "Egg Protein Hair Pack", "Biotin Hair Supplement", "Hair Growth Serum", "Scalp Treatment", "Anti-Hair Fall Treatment"
  ],
  units: ["200ml", "400ml", "100ml", "175ml", "pack"],
  basePrice: [100, 1500]
},

  "cleaning-supplies": {
  brands: ["Lizol", "Harpic", "Domex", "Colin", "Vim", "Dettol", "Savlon", "Magiclean", "Easy Off Bang", "Flash"],
  items: [
    "Floor Cleaner Lavender", "Floor Cleaner Pine", "Floor Cleaner Citrus", "Floor Cleaner Original", "Disinfectant Floor Cleaner",
    "Toilet Cleaner", "Toilet Rim Block", "Bathroom Cleaner Spray", "Tile Cleaner", "Grout Cleaner",
    "Glass Cleaner", "Mirror Cleaner", "Multi-Surface Cleaner", "Kitchen Cleaner", "Degreaser",
    "Drain Cleaner", "Pipe Unclogger", "Mould Remover", "Rust Remover", "Limescale Remover",
    "Disinfectant Spray", "Sanitizer Spray", "Air Purifier Spray", "Surface Wipes", "Disinfectant Wipes",
    "Scrubber Sponge", "Steel Wool", "Cleaning Brush", "Toilet Brush", "Mop Refill",
    "Broom", "Dustpan Set", "Rubber Gloves", "Microfibre Cloth", "Duster"
  ],
  units: ["500ml", "1L", "2L", "pack", "piece"],
  basePrice: [50, 500]
},

  "laundry": {
  brands: ["Surf Excel", "Ariel", "Tide", "Rin", "Wheel", "Vanish", "Comfort", "Ezee", "Genteel", "7th Generation"],
  items: [
    "Surf Excel Matic Front Load", "Surf Excel Matic Top Load", "Surf Excel Easy Wash", "Surf Excel Quick Wash", "Surf Excel Bar",
    "Ariel Matic Front Load", "Ariel Matic Top Load", "Ariel Complete", "Ariel Liquid", "Ariel 3-in-1 Pods",
    "Tide Naturals", "Tide Plus", "Tide Liquid", "Tide Double Power", "Tide Simply",
    "Rin Powder", "Rin Bar", "Rin Advanced", "Wheel Active", "Wheel Smart",
    "Fabric Conditioner Rose", "Fabric Conditioner Lavender", "Fabric Softener", "Comfort Pure", "Comfort Sunshiny",
    "Vanish Stain Remover", "Stain Removal Bar", "Whitener", "Fabric Bleach", "Color Safe Bleach",
    "Delicate Wash Liquid", "Wool Wash", "Silk Wash", "Baby Laundry Liquid", "Enzyme Detergent"
  ],
  units: ["500g", "1kg", "2kg", "3kg", "500ml"],
  basePrice: [80, 800]
},

  "pharmacy-wellness": {
  brands: ["Dolo", "Crocin", "Vicks", "Digene", "Gelusil", "Eno", "Hajmola", "Dabur", "Himalaya", "Baidyanath"],
  items: [
    "Paracetamol 500mg", "Ibuprofen 400mg", "Aspirin", "Antacid Tablets", "Antacid Syrup",
    "Cough Syrup", "Cold & Flu Tablets", "Antihistamine", "Decongestant", "Throat Lozenges",
    "Vitamin C 500mg", "Multivitamin Tablets", "Iron + Folic Acid", "Calcium 500mg", "Vitamin D3 60K",
    "Digestive Enzymes", "Probiotics Capsules", "Fiber Supplement", "Laxative", "Anti-Diarrheal",
    "ORS Powder Orange", "ORS Powder Lemon", "Electrolyte Powder", "Glucose Powder", "Energy Sachets",
    "Antiseptic Cream", "Betadine Solution", "Band-Aid Strips", "Crepe Bandage", "Cotton Rolls",
    "Thermometer Digital", "BP Monitor", "Pulse Oximeter", "Glucometer Strips", "Nebulizer Mask"
  ],
  units: ["strip", "bottle", "pack", "tube", "piece"],
  basePrice: [30, 1500]
}
};

// Generic template for other categories
const genericBrands = ["Premium", "Gold", "Classic", "Pure", "Original", "Natural", "Organic", "Royal", "Heritage", "Select"];
const genericUnits = ["pack", "piece", "set", "box", "kg", "500g", "250g", "1L", "500ml", "100g"];

function generatePrice(base, variance) {
  const min = base[0];
  const max = base[1];
  const price = Math.floor(Math.random() * (max - min) + min);
  // Add variance for different platforms
  return price;
}

function generateProductsForCategory(categorySlug, categoryName, count = 20) {
  const template = productTemplates[categorySlug];
  const products = [];
  
  const imageKeywords = {
    "fresh-vegetables": "vegetable",
    "fresh-fruits": "fruit", 
    "dairy-eggs": "dairy",
    "snacks-chips": "snack chips",
    "beverages": "juice drink",
    "tea-coffee": "tea coffee",
    "biscuits-cookies": "biscuit cookie",
    "chocolates-candy": "chocolate",
    "ice-cream-frozen": "ice cream",
    "meat-seafood": "chicken meat",
    "noodles-pasta": "noodles pasta",
    "ready-to-cook": "food packet",
    "ready-to-eat": "instant food",
    "breakfast-cereals": "cereal oats",
    "baby-food-care": "baby food",
    "health-nutrition": "protein supplement",
    "skin-care": "skincare moisturizer",
    "hair-care": "shampoo hair",
    "oral-care": "toothpaste",
    "bath-body": "soap body wash",
    "feminine-hygiene": "hygiene",
    "cleaning-supplies": "cleaner",
    "laundry": "detergent",
    "dishwashing": "dish soap",
    "air-fresheners": "air freshener",
    "kitchen-accessories": "kitchen",
    "paper-products": "tissue paper",
    "pet-care": "pet food",
    "stationery-office": "stationery",
    "packaged-foods": "packaged food",
    "sauces-spreads": "sauce jam",
    "dry-fruits-nuts": "dry fruits nuts",
    "organic-natural": "organic food",
    "international-foods": "international food",
    "flours-atta": "flour atta",
    "sugar-sweeteners": "sugar honey",
    "vinegar-dressings": "salad dressing",
    "electrical-items": "bulb battery",
    "festive-pooja": "diya incense",
    "gardening": "plant seed",
    "sports-fitness": "fitness gym",
    "pharmacy-wellness": "medicine health",
    "frozen-foods": "frozen food",
    "energy-drinks": "energy drink",
    "condiments": "pickle chutney",
    "rice-grains": "rice grain",
    "pulses-lentils": "dal lentil",
    "oils-ghee": "oil ghee",
    "spices-masala": "spice masala",
    "bread-bakery": "bread bakery"
  };

  const keyword = imageKeywords[categorySlug] || categoryName.toLowerCase();
  
  for (let i = 0; i < count; i++) {
    let name, brand, unit, basePrice;
    
    if (template) {
      const itemIdx = i % template.items.length;
      const brandIdx = Math.floor(Math.random() * template.brands.length);
      const unitIdx = Math.floor(Math.random() * template.units.length);
      
      const variant = Math.floor(i / template.items.length);
      const variantSuffix = variant > 0 ? ` Variant ${variant + 1}` : '';
      
      name = `${template.brands[brandIdx]} ${template.items[itemIdx]}${variantSuffix}`;
      brand = template.brands[brandIdx];
      unit = template.units[unitIdx];
      basePrice = template.basePrice;
    } else {
      // Generic product generation
      const brandIdx = Math.floor(Math.random() * genericBrands.length);
      brand = genericBrands[brandIdx];
      name = `${brand} ${categoryName} Product ${i + 1}`;
      unit = genericUnits[Math.floor(Math.random() * genericUnits.length)];
      basePrice = [30, 500];
    }

    const blinkitBase = generatePrice(basePrice, 0.1);
    const zeptoBase = Math.floor(blinkitBase * (0.85 + Math.random() * 0.3));
    const swiggyBase = Math.floor(blinkitBase * (0.88 + Math.random() * 0.25));
    const mrp = Math.floor(Math.max(blinkitBase, zeptoBase, swiggyBase) * 1.3);

    const blinkitDiscount = Math.floor(((mrp - blinkitBase) / mrp) * 100);
    const zeptoDiscount = Math.floor(((mrp - zeptoBase) / mrp) * 100);
    const swiggyDiscount = Math.floor(((mrp - swiggyBase) / mrp) * 100);

    const imageId = (i % 100) + 1;
    const unsplashImages = {
   "fresh-vegetables": ["photo-1540420773420-3366772f4999","photo-1518977676601-b53f82aba655","photo-1587049352846-4a222e784d38","photo-1561136594-7f68413baa99","photo-1598170845058-32b9d6a5da37"],
   "fresh-fruits": ["photo-1610832958506-aa56368176cf","photo-1619566636858-adf3ef46400b","photo-1518635017498-87f514b751ba","photo-1550258987-190a2d41a8ba","photo-1587132137056-bfbf0166836e"],
   "dairy-eggs": ["photo-1563636619-e9143da7973b","photo-1628088062854-d1870b4553da","photo-1582722872445-44dc5f7e3c8f","photo-1506459225024-1428097a7e18"],
   "snacks-chips": ["photo-1566478989037-eec170784d0b","photo-1621939514649-280e2ee25f60","photo-1599490659213-e2b9527bd087"],
   "beverages": ["photo-1544145945-f90425340c7e","photo-1600271886742-f049cd451bba","photo-1560508180-03f285f67ded"],
   "tea-coffee": ["photo-1544787219-7f47ccb76574","photo-1495474472287-4d71bcdd2085","photo-1509042239860-f550ce710b93"],
   "biscuits-cookies": ["photo-1558961363-fa8fdf82db35","photo-1499636136210-6f4ee915583e","photo-1587424557519-5b7089822731"],
   "chocolates-candy": ["photo-1481391319762-47dff72954d9","photo-1606312619070-d48b4c652a52","photo-1511381939415-e44015466834"],
   "meat-seafood": ["photo-1607623814075-e51df1bdc82f","photo-1615141982883-c7ad0e69fd62","photo-1510130387422-82bed34b37e9"],
   "noodles-pasta": ["photo-1555949258-eb67b1ef0ceb","photo-1551183053-bf91798d1a7f","photo-1621996346565-e3dbc646d9a9"],
   "dry-fruits-nuts": ["photo-1599599810694-b5b37304c041","photo-1608797178974-15b35a64ede9","photo-1576169773869-a3ba5e6f0de6"],
   "health-nutrition": ["photo-1584362917165-526a968579e8","photo-1593095948071-474c5cc2989d","photo-1571019613454-1cb2f99b2d8b"],
   "skin-care": ["photo-1556228578-8c89e6adf883","photo-1571781926291-c477ebfd024b","photo-1612817288484-6f916006741a"],
   "hair-care": ["photo-1522337360788-8b13dee7a37e","photo-1585751119414-ef2636f8aede","photo-1519699047748-de8e457a634e"],
   "oils-ghee": ["photo-1474979266404-7eaacbcd87c5","photo-1603569283847-aa295f0d016a","photo-1518779578993-ec3579fee39f"],
   "spices-masala": ["photo-1596040033229-a9821ebd058d","photo-1532336414038-cf19250c5757","photo-1615485290382-441e4d049cb9"],
   "cleaning-supplies": ["photo-1563453392212-326f5e854473","photo-1527515637462-cff94eecc1ac","photo-1585421514738-01798e348b17"],
   "laundry": ["photo-1582735689369-4fe89db7114c","photo-1558618666-fcd25c85cd64","photo-1545173168-9f1947eebb7f"],
   "pharmacy-wellness": ["photo-1584308666744-24d5c474f2ae","photo-1559757148-5c350d0d3c56","photo-1576091160399-112ba8d25d1d"],
  };

  const photoIds = unsplashImages[categorySlug];
  const imageUrl = photoIds
    ? `https://images.unsplash.com/${photoIds[i % photoIds.length]}?w=300&h=300&fit=crop&auto=format`
    : `https://picsum.photos/seed/${categorySlug}-${i}/300/300`;

    products.push({
      name,
      unit,
      brand,
      image_url: imageUrl,
      blinkit_price: blinkitBase,
      blinkit_mrp: mrp,
      blinkit_discount: Math.max(0, blinkitDiscount),
      blinkit_rating: (3.5 + Math.random() * 1.5).toFixed(1),
      blinkit_delivery_time: `${8 + Math.floor(Math.random() * 12)} mins`,
      blinkit_url: `https://blinkit.com/search?q=${encodeURIComponent(name)}`,
      zepto_price: zeptoBase,
      zepto_mrp: mrp,
      zepto_discount: Math.max(0, zeptoDiscount),
      zepto_rating: (3.5 + Math.random() * 1.5).toFixed(1),
      zepto_delivery_time: `${10 + Math.floor(Math.random() * 10)} mins`,
      zepto_url: `https://www.zeptonow.com/search?query=${encodeURIComponent(name)}`,
      swiggy_price: swiggyBase,
      swiggy_mrp: mrp,
      swiggy_discount: Math.max(0, swiggyDiscount),
      swiggy_rating: (3.5 + Math.random() * 1.5).toFixed(1),
      swiggy_delivery_time: `${10 + Math.floor(Math.random() * 15)} mins`,
      swiggy_url: `https://www.swiggy.com/instamart/search?query=${encodeURIComponent(name)}`,
      is_deal_of_day: Math.random() < 0.05
    });
  }
  
  return products;
}

module.exports = { generateProductsForCategory };
