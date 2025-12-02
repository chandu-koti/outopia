import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all subcategories
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const where: any = {};
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const subcategories = await prisma.subcategory.findMany({
      where,
      include: {
        category: {
          include: {
            brand: true
          }
        },
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

// POST create new subcategory
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.categoryId) {
      return NextResponse.json(
        { error: 'Name and categoryId are required' },
        { status: 400 }
      );
    }
    
    // Generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });

    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
        categoryId: data.categoryId
      },
      include: {
        category: {
          include: {
            brand: true
          }
        },
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subcategory:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A subcategory with this slug already exists' },
        { status: 400 }
      );
    }

    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid category reference' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to create subcategory: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}