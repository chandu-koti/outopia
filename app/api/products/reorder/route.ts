import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Handle automatic reordering using simple remove-and-insert approach
export async function POST(request: Request) {
  try {
    const { productId, categoryId, newOrder } = await request.json();

    if (!productId || !categoryId || newOrder === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If newOrder is null, just remove the order
    if (newOrder === null) {
      await prisma.product.update({
        where: { id: productId },
        data: { displayOrder: null }
      });

      return NextResponse.json({
        message: 'Display order removed',
        updated: 1
      });
    }

    // Get all ordered products in the category
    const productsInCategory = await prisma.product.findMany({
      where: {
        categoryId,
        displayOrder: { not: null }
      },
      orderBy: { displayOrder: 'asc' }
    });

    // Create array of product IDs in current order
    const productIds = productsInCategory.map((p: any) => p.id);

    // Remove the product being moved (if it exists in the list)
    const movingIndex = productIds.indexOf(productId);
    if (movingIndex > -1) {
      productIds.splice(movingIndex, 1);
    }

    // Insert the product at the new position (convert to 0-indexed)
    const insertIndex = Math.min(newOrder - 1, productIds.length);
    productIds.splice(insertIndex, 0, productId);

    // Reassign sequential orders starting from 1
    const updates = productIds.map((id: any, index: number) =>
      prisma.product.update({
        where: { id },
        data: { displayOrder: index + 1 }
      })
    );

    // Execute all updates in a transaction
    await prisma.$transaction(updates);

    return NextResponse.json({
      message: 'Products reordered successfully',
      updated: updates.length
    });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json(
      { error: 'Failed to reorder products' },
      { status: 500 }
    );
  }
}
