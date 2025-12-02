#!/usr/bin/env node

const https = require('https');
const { PrismaClient } = require('@prisma/client');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.magenta}━━━ ${msg} ━━━${colors.reset}\n`)
};

async function checkAPIHealth(url) {
  return new Promise((resolve, reject) => {
    https.get(url + '/api/health', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (e) {
          reject(new Error('Failed to parse response: ' + data));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function testLogin(url) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      email: 'admin@infrascapes.com',
      password: 'admin123'
    });

    const options = {
      hostname: url.replace('https://', '').replace('http://', ''),
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function checkDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
  }

  const prisma = new PrismaClient();
  
  try {
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get counts
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    const projectCount = await prisma.project.count();
    
    return {
      connected: true,
      users: userCount,
      products: productCount,
      projects: projectCount
    };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const productionUrl = process.env.PRODUCTION_URL || 'https://infrascape.techarion.com';
  
  log.header('Production Diagnostics for Infrascape Website');
  log.info(`Testing: ${productionUrl}`);
  
  // Check environment variables
  log.header('Environment Variables');
  
  const envVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'NEXT_PUBLIC_API_URL',
    'NODE_ENV'
  ];
  
  let missingEnv = false;
  envVars.forEach(varName => {
    if (process.env[varName]) {
      log.success(`${varName} is set`);
    } else {
      log.error(`${varName} is NOT set`);
      missingEnv = true;
    }
  });
  
  if (missingEnv) {
    log.warning('Some environment variables are missing. This may cause issues.');
  }
  
  // Check API health
  log.header('API Health Check');
  
  try {
    const health = await checkAPIHealth(productionUrl);
    
    if (health.status === 'healthy') {
      log.success('API is healthy');
    } else {
      log.warning(`API status: ${health.status}`);
    }
    
    // Check individual components
    if (health.checks) {
      if (health.checks.database === 'connected') {
        log.success(`Database connected (${health.checks.users || 0} users)`);
      } else {
        log.error('Database connection failed');
        if (health.checks.databaseError) {
          log.error(`Error: ${health.checks.databaseError}`);
        }
      }
      
      // Check env vars from API perspective
      if (health.checks.envVars) {
        Object.entries(health.checks.envVars).forEach(([key, value]) => {
          if (value === true || (typeof value === 'string' && value !== 'not set')) {
            log.success(`API has ${key}`);
          } else {
            log.warning(`API missing ${key}`);
          }
        });
      }
    }
  } catch (error) {
    log.error(`Health check failed: ${error.message}`);
  }
  
  // Test login
  log.header('Login Test');
  
  try {
    const loginResult = await testLogin(productionUrl);
    
    if (loginResult.status === 200) {
      log.success('Login successful');
      log.info(`User: ${loginResult.data.user?.email}`);
    } else if (loginResult.status === 401) {
      log.warning('Login failed - invalid credentials');
      log.info('This is expected if you changed the default password');
    } else {
      log.error(`Login failed with status ${loginResult.status}`);
      if (loginResult.data.error) {
        log.error(`Error: ${loginResult.data.error}`);
      }
      if (loginResult.data.code) {
        log.error(`Error code: ${loginResult.data.code}`);
      }
    }
  } catch (error) {
    log.error(`Login test failed: ${error.message}`);
  }
  
  // Direct database check (if DATABASE_URL is available)
  if (process.env.DATABASE_URL) {
    log.header('Direct Database Check');
    
    try {
      const dbStatus = await checkDatabase();
      log.success('Direct database connection successful');
      log.info(`Users: ${dbStatus.users}`);
      log.info(`Products: ${dbStatus.products}`);
      log.info(`Projects: ${dbStatus.projects}`);
    } catch (error) {
      log.error(`Direct database check failed: ${error.message}`);
      
      if (error.code === 'P2021') {
        log.error('Tables not found. You need to run migrations.');
        log.info('Run: npx prisma migrate deploy');
      } else if (error.code === 'P1001') {
        log.error('Cannot connect to database.');
        log.info('Check your DATABASE_URL and network connection.');
      }
    }
  } else {
    log.warning('DATABASE_URL not set locally - skipping direct database check');
  }
  
  // Summary
  log.header('Summary and Recommendations');
  
  log.info('If login is failing in production:');
  log.info('1. Ensure all environment variables are set in your hosting platform');
  log.info('2. Run database migrations: npx prisma migrate deploy');
  log.info('3. Run setup script: node scripts/setup-production.js');
  log.info('4. Check server logs for detailed error messages');
  log.info('5. Verify DATABASE_URL has correct credentials and SSL mode');
  
  log.info('\nDefault admin credentials:');
  log.info('Email: admin@infrascapes.com');
  log.info('Password: admin123');
  log.warning('Change the password immediately after first login!');
}

// Run diagnostics
main().catch(error => {
  log.error(`Diagnostics failed: ${error.message}`);
  process.exit(1);
});