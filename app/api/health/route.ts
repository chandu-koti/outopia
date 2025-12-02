import { NextResponse } from 'next/server';
import prisma, { testDatabaseConnection } from '@/lib/prisma';

export async function GET() {
  const response: any = {
    status: 'checking',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {}
  };

  // Check environment variables
  response.checks.envVars = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'not set',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'not set'
  };

  // Check database connection with retry
  const dbConnected = await testDatabaseConnection();
  
  if (dbConnected) {
    try {
      response.checks.database = 'connected';
      
      // Check if users table exists and has data
      const userCount = await prisma.user.count();
      response.checks.users = userCount;
      
      // Check for admin user
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      });
      response.checks.admins = adminCount;
      
      // Get table counts
      const [products, projects, brands, categories] = await Promise.all([
        prisma.product.count(),
        prisma.project.count(),
        prisma.brand.count(),
        prisma.category.count()
      ]);
      
      response.checks.tables = {
        products,
        projects,
        brands,
        categories
      };
      
    } catch (error: any) {
      response.checks.database = 'connected_but_error';
      response.checks.databaseError = error.message;
      
      if (error.code === 'P2021') {
        response.checks.migrationNeeded = true;
        response.checks.databaseError = 'Tables not found. Run: npx prisma migrate deploy';
      }
    }
  } else {
    response.checks.database = 'failed';
    response.checks.databaseError = 'Could not connect after retries';
    
    if (!process.env.DATABASE_URL) {
      response.checks.databaseError = 'DATABASE_URL not configured';
    }
  }

  // Overall status
  response.status = response.checks.database === 'connected' ? 'healthy' : 'unhealthy';

  // Add recommendations
  if (response.status === 'unhealthy') {
    response.recommendations = [];
    
    if (!process.env.DATABASE_URL) {
      response.recommendations.push('Set DATABASE_URL environment variable');
    }
    if (!process.env.JWT_SECRET) {
      response.recommendations.push('Set JWT_SECRET environment variable');
    }
    if (response.checks.migrationNeeded) {
      response.recommendations.push('Run database migrations: npx prisma migrate deploy');
    }
    if (response.checks.database === 'failed') {
      response.recommendations.push('Check database connection and credentials');
    }
  }

  return NextResponse.json(response);
}