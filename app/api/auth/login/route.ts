import { NextResponse } from 'next/server';
import { validateUser, generateToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Log environment info for debugging
    console.log('Login attempt - Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not set'
    });

    // Test database connection first
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection successful');
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: process.env.NODE_ENV === 'development' ? dbError.message : undefined,
          code: 'DB_CONNECTION_ERROR'
        },
        { status: 503 }
      );
    }

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Attempting login for:', email);

    // Validate user credentials
    const user = await validateUser(email, password);

    if (!user) {
      console.log('Login failed - invalid credentials for:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('User validated successfully:', user.email);

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
      console.error('JWT_SECRET not configured in production!');
      return NextResponse.json(
        { error: 'Authentication configuration error' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    console.log('Token generated successfully');

    // Create response with token
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    }, { status: 200 });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    console.log('Login successful for:', user.email);
    return response;

  } catch (error: any) {
    console.error('Login error - Full error:', error);
    console.error('Login error - Stack:', error.stack);
    
    // More specific error messages for debugging
    let errorMessage = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    
    if (error.code === 'P2021' || error.message?.includes('table')) {
      errorMessage = 'Database table not found. Please run migrations.';
      errorCode = 'DB_TABLE_MISSING';
    } else if (error.code === 'P2002') {
      errorMessage = 'Database constraint error.';
      errorCode = 'DB_CONSTRAINT';
    } else if (error.code === 'P1001' || error.message?.includes('connect')) {
      errorMessage = 'Database connection failed. Check DATABASE_URL.';
      errorCode = 'DB_CONNECTION';
    } else if (error.message?.includes('JWT')) {
      errorMessage = 'Authentication configuration error.';
      errorCode = 'JWT_ERROR';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        code: errorCode,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}