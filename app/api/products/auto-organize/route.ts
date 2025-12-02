import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Auto-organize products and fix any duplicate orders in a category
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
    const allProducts = await prisma.product.findMany({
      where: { categoryId },
      orderBy: [
        { displayOrder: { sort: 'asc', nulls: 'last' } },
        { createdAt: 'asc' }
      ]
    });

    // Separate ordered and unordered products
    const orderedProducts = allProducts.filter((p: any) => p.displayOrder !== null);
    const unorderedProducts = allProducts.filter((p: any) => p.displayOrder === null);

    if (unorderedProducts.length === 0) {
      return NextResponse.json({
        message: 'No unordered products to organize',
        organized: 0
      });
    }

    // Find the next available order number (after the highest existing order)
    const maxOrder = orderedProducts.length > 0
      ? Math.max(...orderedProducts.map((p: any) => p.displayOrder!))
      : 0;

    // ONLY assign orders to unordered products, starting after the highest existing order
    const updates = unorderedProducts.map((product: any, index: number) => {
      return prisma.product.update({
        where: { id: product.id },
        data: { displayOrder: maxOrder + index + 1 }
      });
    });

    // Execute all updates in a transaction
    if (updates.length > 0) {
      await prisma.$transaction(updates);
    }

    return NextResponse.json({
      message: `Successfully organized ${unorderedProducts.length} unordered product${unorderedProducts.length !== 1 ? 's' : ''}`,
      organized: unorderedProducts.length,
      startOrder: maxOrder + 1,
      endOrder: maxOrder + unorderedProducts.length
    });
  } catch (error) {
    console.error('Error auto-organizing products:', error);
    return NextResponse.json(
      { error: 'Failed to auto-organize products' },
      { status: 500 }
    );
  }
}
