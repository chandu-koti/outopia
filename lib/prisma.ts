import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client with connection pool settings and retry logic
const createPrismaClient = () => {
  // Handle missing DATABASE_URL during build time
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Prisma Client will be created without a datasource URL.');
    // Return a mock client during build
    return new Proxy({} as PrismaClient, {
      get: () => () => Promise.resolve([]),
      has: () => true
    });
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });
};

const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Add connection management
if (process.env.NODE_ENV === 'production') {
  // In production, handle connection errors gracefully
  prisma.$connect().catch((error: any) => {
    console.error('Failed to connect to database:', error);
    console.error('Database URL configured:', !!process.env.DATABASE_URL);
  });

  // Graceful shutdown
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

// Helper function to test database connection with retry
export async function testDatabaseConnection(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i < retries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  return false;
}

export default prisma;