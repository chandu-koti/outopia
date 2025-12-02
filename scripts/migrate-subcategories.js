const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateSubcategories() {
  console.log('Starting subcategory migration...');

  try {
    // Fetch all categories
    const categories = await prisma.category.findMany();

    console.log(`Found ${categories.length} categories to check`);

    let totalCreated = 0;

    for (const category of categories) {
      if (category.subcategories && category.subcategories.length > 0) {
        console.log(`\nMigrating ${category.subcategories.length} subcategories for category: ${category.name}`);
        
        for (const subcategoryName of category.subcategories) {
          const slug = subcategoryName.toLowerCase().replace(/\s+/g, '-');
          
          try {
            // Check if subcategory already exists
            const existing = await prisma.subcategory.findUnique({
              where: { slug }
            });

            if (!existing) {
              // Create the subcategory
              const subcategory = await prisma.subcategory.create({
                data: {
                  name: subcategoryName,
                  slug,
                  categoryId: category.id,
                  description: null
                }
              });
              
              console.log(`  ✓ Created subcategory: ${subcategoryName} (${slug})`);
              totalCreated++;
            } else {
              console.log(`  - Subcategory already exists: ${subcategoryName}`);
            }
          } catch (error) {
            console.error(`  ✗ Error creating subcategory ${subcategoryName}:`, error.message);
          }
        }
      }
    }

    // Count total subcategories
    const totalSubcategories = await prisma.subcategory.count();
    console.log(`\nMigration complete!`);
    console.log(`  - Created ${totalCreated} new subcategories`);
    console.log(`  - Total subcategories in database: ${totalSubcategories}`);

  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateSubcategories().catch(console.error);