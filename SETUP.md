# 🚀 Setup Guide — Restaurant QR Menu System

Follow these steps **in order** after downloading the project.

---

## Step 1 — Install Node.js

If you don't have Node.js 20+ installed:

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

# Verify
node --version   # should say v20.x.x
```

---

## Step 2 — Install dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

---

## Step 3 — Set up a PostgreSQL database

**Option A: Free cloud database (easiest — recommended)**

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → copy the **Connection string** (starts with `postgresql://...`)

**Option B: Local PostgreSQL**

```bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb restaurant
```

---

## Step 4 — Create your environment file

Copy the example file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
DATABASE_URL="postgresql://..."     # paste your connection string here
AUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

To generate AUTH_SECRET, run this in your terminal:
```bash
openssl rand -base64 32
```

---

## Step 5 — Run database migrations + seed

```bash
# Create all tables
npm run db:migrate

# Insert sample restaurant data + admin user
npm run db:seed
```

After seeding you can log in with:
- **Email:** admin@restaurant.com
- **Password:** admin123456

⚠️ Change this password in production!

---

## Step 6 — Start the development server

```bash
npm run dev
```

Open your browser at **http://localhost:3000**

| URL | What you'll see |
|---|---|
| http://localhost:3000 | Restaurant homepage |
| http://localhost:3000/menu | Digital menu (QR target) |
| http://localhost:3000/admin | Admin dashboard (requires login) |
| http://localhost:3000/login | Admin login page |

---

## Step 7 — Update your restaurant info

1. Go to http://localhost:3000/login
2. Log in with admin@restaurant.com / admin123456
3. Go to **Settings** → change name, address, phone
4. **Important:** Update the **Menu URL** to your real domain before downloading the QR code

---

## Step 8 — Download your QR code

1. In admin panel → click **QR Code**
2. Click **Download QR Code (1200×1200 PNG)**
3. Print it and put it on your tables!

---

## Deploying to Vercel (production)

```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel

# Add environment variables
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
vercel env add NEXTAUTH_URL production    # set to https://yourdomain.com

# Deploy to production
vercel --prod
```

In Vercel dashboard → Settings → Build Command, set:
```
prisma generate && prisma migrate deploy && next build
```

---

## Project Structure — Quick Reference

```
src/
├── app/
│   ├── (public)/menu/        ← The menu page customers see when scanning QR
│   ├── admin/                ← Admin dashboard (protected, login required)
│   └── api/                  ← REST API endpoints
├── components/
│   ├── admin/                ← Admin UI forms and tables
│   └── ui/                   ← Reusable UI components
├── features/
│   ├── menu/queries.ts       ← Database queries for the menu
│   └── products/queries.ts   ← Database queries for products
├── lib/
│   ├── auth.ts               ← Authentication configuration
│   ├── prisma.ts             ← Database client
│   └── validations.ts        ← Input validation schemas
└── services/
    └── qrService.ts          ← QR code generation
```

## Customisation

**Change restaurant branding colours:**
Edit `tailwind.config.ts` → update the `brand` colour values.

**Change currency:**
Edit `src/lib/utils.ts` → `formatPrice()` function. Currently outputs TND.

**Add more allergens:**
Edit `src/components/admin/ProductForm.tsx` → `ALLERGEN_OPTIONS` array.
