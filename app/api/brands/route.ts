import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all brands
export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        categories: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

// POST create new brand
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const brand = await prisma.brand.create({
      data: data
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}