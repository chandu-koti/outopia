import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        location: data.location || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message || null,
        source: data.source || null
      }
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create contact inquiry' },
      { status: 500 }
    );
  }
}