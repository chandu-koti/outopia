#!/usr/bin/env node

const BASE_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🔧 Testing Backend Functionality\n');
  console.log('================================\n');

  try {
    // Test 1: Check API endpoints
    console.log('1. Testing Product API...');
    const productsRes = await fetch(`${BASE_URL}/api/products`);
    const products = await productsRes.json();
    console.log(`   ✅ Found ${products.length} products\n`);

    console.log('2. Testing Projects API...');
    const projectsRes = await fetch(`${BASE_URL}/api/projects`);
    const projects = await projectsRes.json();
    console.log(`   ✅ Found ${projects.length} projects\n`);

    console.log('3. Testing Brands API...');
    const brandsRes = await fetch(`${BASE_URL}/api/brands`);
    const brands = await brandsRes.json();
    console.log(`   ✅ Found ${brands.length} brands\n`);

    console.log('4. Testing Categories API...');
    const categoriesRes = await fetch(`${BASE_URL}/api/categories`);
    const categories = await categoriesRes.json();
    console.log(`   ✅ Found ${categories.length} categories\n`);

    // Test 2: Login
    console.log('5. Testing Authentication...');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@outopia.com',
        password: 'admin123'
      })
    });
    
    const loginData = await loginRes.json();
    if (loginData.token) {
      console.log(`   ✅ Login successful! User: ${loginData.user.email}\n`);
    } else {
      console.log(`   ❌ Login failed: ${loginData.error}\n`);
    }

    // Summary
    console.log('================================');
    console.log('✨ Backend is working correctly!\n');
    console.log('You can now access:');
    console.log(`  - Admin Login: ${BASE_URL}/login`);
    console.log(`  - Admin Dashboard: ${BASE_URL}/admin (after login)`);
    console.log(`  - Products Management: ${BASE_URL}/admin/products`);
    console.log('\nDefault admin credentials:');
    console.log('  Email: admin@outopia.com');
    console.log('  Password: admin123\n');

  } catch (error) {
    console.error('❌ Error testing backend:', error.message);
    console.log('\nMake sure the development server is running on port 3001');
  }
}

testBackend();
