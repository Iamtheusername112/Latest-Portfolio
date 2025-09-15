import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-2024';
    
    // Test JWT creation and verification
    const testPayload = { userId: 1, email: 'test@example.com', role: 'admin' };
    
    const token = jwt.sign(testPayload, jwtSecret, { expiresIn: '1h' });
    const decoded = jwt.verify(token, jwtSecret);
    
    return NextResponse.json({
      success: true,
      jwtSecret: jwtSecret.substring(0, 10) + '...',
      tokenCreated: !!token,
      tokenVerified: !!decoded,
      decodedPayload: decoded,
      message: 'JWT system is working correctly'
    });
  } catch (error) {
    console.error('❌ JWT debug error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set',
      message: 'JWT system has issues'
    }, { status: 500 });
  }
}
