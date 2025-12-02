import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single subcategory
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            brand: true
          }
        },
        products: true
      }
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

// PUT update subcategory
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');

    const subcategory = await prisma.subcategory.update({
      where: { id },
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
        }
      }
    });

    return NextResponse.json(subcategory);
  } catch (error: any) {
    console.error('Error updating subcategory:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A subcategory with this slug already exists' },
        { status: 400 }
      );
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE subcategory
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if subcategory has products
    const subcategory = await prisma.subcategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    if (subcategory._count.products > 0) {
      return NextResponse.json(
        { error: 'Cannot delete subcategory with existing products' },
        { status: 400 }
      );
    }

    await prisma.subcategory.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}