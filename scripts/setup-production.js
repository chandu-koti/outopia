#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting production setup...');

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');

    // Check if admin user exists
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    if (adminCount === 0) {
      console.log('📝 Creating default admin user...');
      
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      const admin = await prisma.user.create({
        data: {
          email: 'admin@outopia.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN'
        }
      });

      console.log('✅ Admin user created:');
      console.log('   Email: admin@outopia.com');
      console.log('   Password: admin123');
      console.log('   ⚠️  IMPORTANT: Change this password immediately!');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check brands
    const brandCount = await prisma.brand.count();
    console.log(`📊 Brands in database: ${brandCount}`);

    // Check categories
    const categoryCount = await prisma.category.count();
    console.log(`📊 Categories in database: ${categoryCount}`);

    // Check products
    const productCount = await prisma.product.count();
    console.log(`📊 Products in database: ${productCount}`);

    // Check projects
    const projectCount = await prisma.project.count();
    console.log(`📊 Projects in database: ${projectCount}`);

    console.log('\n✅ Production setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Log in with the admin credentials');
    console.log('2. Change the admin password');
    console.log('3. Add your brands, categories, and products');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.code === 'P2021') {
      console.log('\n⚠️  Tables not found. Running migrations...');
      console.log('Run: npx prisma migrate deploy');
    } else if (error.code === 'P1001') {
      console.log('\n⚠️  Cannot connect to database.');
      console.log('Check your DATABASE_URL environment variable.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
