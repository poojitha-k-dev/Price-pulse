# 🛒 PricePulse — Grocery Price Comparison App

Compare grocery prices across **Blinkit**, **Zepto**, and **Swiggy Instamart** — all in one place.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Auth | JWT (JSON Web Tokens) |
| Styling | Custom CSS (no Tailwind dependency) |

## 📁 Project Structure

```
grocery-compare/
├── backend/
│   ├── config/
│   │   ├── db.js              # MySQL connection pool
│   │   └── schema.sql         # Database schema
│   ├── data/
│   │   ├── categories.js      # 50 categories
│   │   ├── productGenerator.js # Product data generator
│   │   └── seed.js            # DB seeder (500+ products/category)
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── routes/
│   │   ├── auth.js            # Login & Signup
│   │   ├── products.js        # Search, categories, deals
│   │   └── user.js            # Profile, saved, history
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   ├── ProductCard.js
        │   └── LocationModal.js
        ├── context/
        │   └── AuthContext.js
        ├── pages/
        │   ├── Home.js
        │   ├── Search.js
        │   ├── CategoryPage.js
        │   ├── Login.js
        │   ├── Signup.js
        │   ├── Dashboard.js
        │   └── ProductDetail.js
        ├── App.js
        ├── index.js
        └── index.css
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm

### 1. Database Setup

```bash
# Log into MySQL
mysql -u root -p

# Run schema
source /path/to/grocery-compare/backend/config/schema.sql
```

Or directly:
```bash
mysql -u root -p < backend/config/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MySQL credentials

# Seed database (50 categories × 500 products = 25,000 products)
npm run seed

# Start server
npm run dev    # development (nodemon)
npm start      # production
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## ⚙️ Environment Variables

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=grocery_compare
JWT_SECRET=your_super_secret_key
PORT=5000
```

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/categories` | All 50 categories |
| GET | `/api/products/search?q=milk&sort=price&page=1` | Search products |
| GET | `/api/products/category/:slug` | Products by category |
| GET | `/api/products/:id` | Single product detail |
| GET | `/api/products/special/deals` | Deal of the day |

### User (Protected — needs JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |
| PUT | `/api/user/location` | Update location |
| POST | `/api/user/save-product/:id` | Save/unsave product |
| GET | `/api/user/saved` | Saved products |
| GET | `/api/user/search-history` | Recent searches |

## 📊 Database Schema

```sql
users            → id, name, email, password, pincode, city, lat, lng
categories       → id, name, slug, icon, description, sort_order
products         → id, name, category_id, image_url, unit, brand,
                   blinkit_price/mrp/discount/rating/delivery/url,
                   zepto_price/mrp/discount/rating/delivery/url,
                   swiggy_price/mrp/discount/rating/delivery/url,
                   is_deal_of_day
saved_products   → id, user_id, product_id, saved_at
search_history   → id, user_id, query, searched_at
```

## ✨ Features

- 🔍 **Smart Search** — Full-text search across 25,000+ products
- 💰 **Price Comparison** — Side-by-side Blinkit vs Zepto vs Swiggy
- 💚 **Best Deal Highlighting** — Cheapest option shown in green
- 💾 **Save Products** — Wishlist for logged-in users
- 📍 **Live Location** — GPS + manual pincode support
- 🔐 **JWT Auth** — Secure login & signup
- 📦 **50 Categories** — Vegetables to Pharmacy
- 🛒 **Checkout Redirect** — Goes to actual platform with consent modal
- 📱 **Responsive** — Works on mobile & desktop
- 🏷️ **Deal of Day** — Random daily deals

## 🚀 Production Deployment

### Backend (e.g., Railway, Render)
```bash
# Set environment variables in your hosting platform
# Start command:
node server.js
```

### Frontend (e.g., Vercel, Netlify)
```bash
npm run build
# Deploy the build/ folder
# Set REACT_APP_API_URL if backend is on different domain
```

### MySQL Hosting
- PlanetScale (free tier)
- Railway (free tier)
- AWS RDS
- DigitalOcean Managed MySQL

## ⚠️ Note on Data

All product data is **manually seeded** with realistic Indian grocery pricing. Prices are approximations based on typical Blinkit/Zepto/Swiggy ranges. Checkout links redirect to platform search pages for the product name.

## 📝 License
MIT
