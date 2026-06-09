import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123456', 12)
  await prisma.user.upsert({
    where: { email: 'admin@restaurant.com' },
    update: {},
    create: {
      email: 'admin@restaurant.com',
      hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  // Restaurant
  await prisma.restaurant.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      name: 'La Maison',
      description: 'Fine dining with a modern twist. Fresh ingredients, bold flavours.',
      address: '12 Rue de la Paix, Tunis 1000',
      phone: '+216 71 000 000',
      email: 'contact@lamaison.tn',
      menuUrl: 'http://localhost:3000/menu',
    },
  })

  // Categories
  const starters = await prisma.category.upsert({
    where: { slug: 'starters' },
    update: {},
    create: { name: 'Starters', slug: 'starters', position: 1, description: 'Light beginnings' },
  })
  const mains = await prisma.category.upsert({
    where: { slug: 'mains' },
    update: {},
    create: { name: 'Main Courses', slug: 'mains', position: 2, description: 'Hearty dishes' },
  })
  const desserts = await prisma.category.upsert({
    where: { slug: 'desserts' },
    update: {},
    create: { name: 'Desserts', slug: 'desserts', position: 3, description: 'Sweet endings' },
  })
  const drinks = await prisma.category.upsert({
    where: { slug: 'drinks' },
    update: {},
    create: { name: 'Drinks', slug: 'drinks', position: 4, description: 'Beverages & cocktails' },
  })

  // Products — Starters
  const starterItems = [
    { name: 'Brik à l\'Oeuf', description: 'Crispy pastry with egg, tuna and capers', price: 850, position: 1, isHighlighted: true, allergens: ['eggs', 'fish', 'gluten'] },
    { name: 'Salade Mechouia', description: 'Grilled pepper and tomato salad with olive oil', price: 700, position: 2, allergens: [] },
    { name: 'Harissa Prawns', description: 'Sautéed prawns with house harissa butter', price: 1200, position: 3, allergens: ['shellfish'] },
  ]
  for (const item of starterItems) {
    await prisma.product.create({ data: { ...item, categoryId: starters.id } }).catch(() => {})
  }

  // Products — Mains
  const mainItems = [
    { name: 'Lamb Tagine', description: 'Slow-cooked lamb with prunes, almonds and ras el hanout', price: 2800, position: 1, isHighlighted: true, allergens: ['nuts'] },
    { name: 'Grilled Sea Bass', description: 'Whole sea bass with chermoula and roasted vegetables', price: 3200, position: 2, allergens: ['fish'] },
    { name: 'Couscous Royal', description: 'Semolina with seven vegetables and merguez', price: 2400, position: 3, allergens: ['gluten'] },
    { name: 'Vegetable Pastilla', description: 'Flaky pastry with spiced vegetables and almonds', price: 1900, position: 4, allergens: ['gluten', 'nuts'] },
  ]
  for (const item of mainItems) {
    await prisma.product.create({ data: { ...item, categoryId: mains.id } }).catch(() => {})
  }

  // Products — Desserts
  const dessertItems = [
    { name: 'Makroudh', description: 'Semolina pastry with date filling and honey', price: 600, position: 1, isHighlighted: true, allergens: ['gluten', 'nuts'] },
    { name: 'Orange Blossom Panna Cotta', description: 'Silky cream with orange blossom water and pistachios', price: 800, position: 2, allergens: ['dairy', 'nuts'] },
    { name: 'Seasonal Fruit Plate', description: 'Fresh seasonal fruits with mint syrup', price: 700, position: 3, allergens: [] },
  ]
  for (const item of dessertItems) {
    await prisma.product.create({ data: { ...item, categoryId: desserts.id } }).catch(() => {})
  }

  // Products — Drinks
  const drinkItems = [
    { name: 'Mint Tea', description: 'Traditional green tea with fresh mint and pine nuts', price: 400, position: 1, allergens: ['nuts'] },
    { name: 'Fresh Orange Juice', description: 'Squeezed to order', price: 500, position: 2, allergens: [] },
    { name: 'Sparkling Water', description: '33cl bottle', price: 300, position: 3, allergens: [] },
    { name: 'House Lemonade', description: 'Lemon, mint, sugar and sparkling water', price: 450, position: 4, allergens: [] },
  ]
  for (const item of drinkItems) {
    await prisma.product.create({ data: { ...item, categoryId: drinks.id } }).catch(() => {})
  }

  console.log('Seeding complete!')
  console.log('Admin login: admin@restaurant.com / admin123456')
}

main().catch(console.error).finally(() => prisma.$disconnect())
