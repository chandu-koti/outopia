import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const data = await request.json();

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: {
        status: data.status
      }
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error updating quote request:', error);
    return NextResponse.json(
      { error: 'Failed to update quote request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await prisma.quoteRequest.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting quote request:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote request' },
      { status: 500 }
    );
  }
}