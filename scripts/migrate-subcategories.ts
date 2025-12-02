import prisma from '../lib/prisma';

async function migrateSubcategories() {
  console.log('Starting subcategory migration...');

  try {
    // Fetch all categories with their subcategories array
    const categories = await prisma.category.findMany({
      where: {
        subcategories: {
          isEmpty: false
        }
      }
    });

    console.log(`Found ${categories.length} categories with subcategories to migrate`);

    for (const category of categories) {
      console.log(`\nMigrating subcategories for category: ${category.name}`);
      
      if (category.subcategories && category.subcategories.length > 0) {
        for (const subcategoryName of category.subcategories) {
          const slug = subcategoryName.toLowerCase().replace(/\s+/g, '-');
          
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
          } else {
            console.log(`  - Subcategory already exists: ${subcategoryName}`);
          }
        }
      }
    }

    // Count total subcategories created
    const totalSubcategories = await prisma.subcategory.count();
    console.log(`\nMigration complete! Total subcategories in database: ${totalSubcategories}`);

    // Optional: Clear the old subcategories array field after successful migration
    // Uncomment the following lines if you want to remove the old data
    /*
    console.log('\nCleaning up old subcategories arrays...');
    await prisma.category.updateMany({
      data: {
        subcategories: []
      }
    });
    console.log('Old subcategories arrays cleared.');
    */

  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateSubcategories().catch(console.error);