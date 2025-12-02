import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { brandsData } from '../lib/data/brands';
import { categoriesData } from '../lib/data/categories';
import { productsData } from '../lib/data/products';
import { projectsData } from '../lib/projects-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@outopia.com' },
    update: {},
    create: {
      email: 'admin@outopia.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN'
    }
  });
  console.log('Admin user created:', adminUser.email);

  // Seed brands
  for (const brandKey of Object.keys(brandsData)) {
    const brandData = brandsData[brandKey];
    const brand = await prisma.brand.upsert({
      where: { name: brandData.name },
      update: {},
      create: {
        name: brandData.name,
        logo: brandData.logo,
        lightLogo: brandData.lightLogo,
        tagline: brandData.tagline,
        subtitle: brandData.subtitle,
        description: brandData.description,
        heroImage: brandData.heroImage,
        gradient: brandData.gradient,
        accentColor: brandData.accentColor,
        primaryButton: brandData.primaryButton,
        primaryButtonLink: brandData.primaryButtonLink,
        secondaryButton: brandData.secondaryButton,
        secondaryButtonLink: brandData.secondaryButtonLink
      }
    });
    console.log(`Brand created: ${brand.name}`);
  }

  // Get brand IDs for reference
  const brands = await prisma.brand.findMany();
  const brandMap = brands.reduce((acc: any, brand: any) => {
    acc[brand.name.toLowerCase()] = brand.id;
    return acc;
  }, {} as Record<string, string>);

  // Seed categories
  for (const categoryKey of Object.keys(categoriesData)) {
    const categoryData = categoriesData[categoryKey];
    const brandId = brandMap[categoryData.brand];
    if (!brandId) {
      console.log(`Brand not found for category: ${categoryData.name}`);
      continue;
    }

    const category = await prisma.category.upsert({
      where: { slug: categoryData.id },
      update: {},
      create: {
        name: categoryData.name,
        slug: categoryData.id,
        description: categoryData.description,
        image: categoryData.image,
        href: categoryData.href,
        brandId: brandId,
        count: categoryData.count,
        subcategories: categoryData.subcategories || []
      }
    });
    console.log(`Category created: ${category.name}`);
  }

  // Get category IDs for reference
  const categories = await prisma.category.findMany();
  const categoryMap = categories.reduce((acc: any, category: any) => {
    acc[category.slug] = category.id;
    return acc;
  }, {} as Record<string, string>);

  // Seed products
  for (const productKey of Object.keys(productsData)) {
    const productData = productsData[productKey];
    const categoryId = categoryMap[productData.category];
    const brandId = brandMap[productData.brand];

    if (!categoryId || !brandId) {
      console.log(`Category or brand not found for product: ${productData.name}`);
      continue;
    }

    const product = await prisma.product.upsert({
      where: { slug: productData.id },
      update: {},
      create: {
        name: productData.name,
        slug: productData.id,
        categoryId: categoryId,
        brandId: brandId,
        price: productData.price,
        image: productData.image,
        description: productData.description,
        specifications: productData.specifications || {},
        features: productData.features || [],
        inStock: productData.inStock ?? true,
        images: [productData.image]
      }
    });
    console.log(`Product created: ${product.name}`);
  }

  // Seed projects
  for (const projectData of projectsData) {
    const project = await prisma.project.upsert({
      where: { slug: projectData.id },
      update: {
        images: projectData.images.gallery || []
      },
      create: {
        name: projectData.title,
        slug: projectData.id,
        client: projectData.client,
        location: projectData.location,
        area: projectData.duration,
        year: projectData.year,
        category: projectData.category,
        description: projectData.description,
        challenge: projectData.challenge,
        solution: projectData.solution,
        impact: projectData.scope.join(', '),
        mainImage: projectData.images.main,
        images: projectData.images.gallery || [],
        features: projectData.scope,
        testimonial: projectData.testimonial?.text,
        testimonialAuthor: projectData.testimonial ? `${projectData.testimonial.author}, ${projectData.testimonial.designation}` : undefined,
        featured: ['botinical-garden', 'tech-park', 'corporate-campus', 'tridasa'].includes(projectData.id)
      }
    });
    console.log(`Project created: ${project.name}`);
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
