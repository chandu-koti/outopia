import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const data = await request.json();

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status: data.status
      }
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error updating contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update contact inquiry' },
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
    await prisma.contactInquiry.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact inquiry' },
      { status: 500 }
    );
  }
}