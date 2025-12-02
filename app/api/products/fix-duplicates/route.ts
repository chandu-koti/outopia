import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Fix duplicate displayOrder values in a category
export async function POST(request: Request) {
  try {
    const { categoryId } = await request.json();

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // Get all products in the category ordered by current displayOrder, then by creation date
    const products = await prisma.product.findMany({
      where: { categoryId },
      orderBy: [
        { displayOrder: { sort: 'asc', nulls: 'last' } },
        { createdAt: 'asc' }
      ]
    });

    // Separate ordered and unordered products
    const orderedProducts = products.filter((p: any) => p.displayOrder !== null);
    const unorderedProducts = products.filter((p: any) => p.displayOrder === null);

    // Reassign sequential orders to all ordered products
    const updates: any[] = [];
    let currentOrder = 1;

    for (const product of orderedProducts) {
      if (product.displayOrder !== currentOrder) {
        updates.push(
          prisma.product.update({
            where: { id: product.id },
            data: { displayOrder: currentOrder }
          })
        );
      }
      currentOrder++;
    }

    // Assign orders to unordered products
    for (const product of unorderedProducts) {
      updates.push(
        prisma.product.update({
          where: { id: product.id },
          data: { displayOrder: currentOrder }
        })
      );
      currentOrder++;
    }

    if (updates.length > 0) {
      await prisma.$transaction(updates);
    }

    return NextResponse.json({
      message: 'Successfully fixed duplicate orders',
      updated: updates.length,
      totalProducts: products.length
    });
  } catch (error) {
    console.error('Error fixing duplicates:', error);
    return NextResponse.json(
      { error: 'Failed to fix duplicate orders' },
      { status: 500 }
    );
  }
}
