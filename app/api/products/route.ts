import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all products with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const categorySlug = searchParams.get('categorySlug');
    const subcategory = searchParams.get('subcategory');
    const subcategorySlug = searchParams.get('subcategorySlug');
    const brand = searchParams.get('brand');
    const brandSlug = searchParams.get('brandSlug');
    const limit = searchParams.get('limit');
    const inStock = searchParams.get('inStock');

    const where: any = {};
    
    // Support both category ID and slug
    if (category) {
      where.categoryId = category;
    } else if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    
    // Support both subcategory ID and slug
    if (subcategory) {
      where.subcategoryId = subcategory;
    } else if (subcategorySlug) {
      where.subcategory = { slug: subcategorySlug };
    }
    
    // Support both brand name and slug for flexibility
    if (brand) {
      where.brand = { name: brand };
    } else if (brandSlug) {
      where.brand = { 
        name: brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1) 
      };
    }

    // Filter by stock status
    if (inStock !== null) {
      where.inStock = inStock === 'true';
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        subcategory: true,
        brand: true
      },
      take: limit ? parseInt(limit) : undefined,
      orderBy: [
        { displayOrder: { sort: 'asc', nulls: 'last' } },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product (protected)
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');

    const product = await prisma.product.create({
      data: {
        ...data,
        slug,
        displayOrder: data.displayOrder || null,
        specifications: data.specifications || {},
        features: data.features || [],
        images: data.images || []
      },
      include: {
        category: true,
        brand: true,
        subcategory: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}