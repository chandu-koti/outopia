import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all categories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    const where: any = {};
    
    if (brandId) {
      where.brandId = brandId;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        brand: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');

    const category = await prisma.category.create({
      data: {
        ...data,
        slug,
        subcategories: data.subcategories || []
      },
      include: {
        brand: true
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}