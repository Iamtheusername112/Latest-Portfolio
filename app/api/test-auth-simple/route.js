import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service.js';

export async function GET(request) {
  try {
    console.log('🧪 Testing authentication system...');
    
    // Test if admin exists
    const adminExists = await AuthService.adminExists();
    console.log('👤 Admin exists:', adminExists);
    
    // Test token verification with a dummy token
    const dummyToken = 'dummy-token';
    const verifyResult = await AuthService.verifyToken(dummyToken);
    console.log('🔐 Token verification result:', verifyResult);
    
    return NextResponse.json({
      success: true,
      adminExists,
      tokenVerification: verifyResult,
      message: 'Authentication system test completed'
    });
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
