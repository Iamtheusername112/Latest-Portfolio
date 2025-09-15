import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';

/**
 * Middleware to authenticate admin API requests
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse|Object>} - Either a redirect response or user data
 */
export async function authenticateAdmin(request) {
  try {
    // Get token from cookies
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          error: 'Authentication required', 
          message: 'No admin token provided' 
        },
        { status: 401 }
      );
    }

    // Verify the token
    const result = await AuthService.verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Authentication failed', 
          message: result.message || 'Invalid token' 
        },
        { status: 401 }
      );
    }

    // Ensure user has admin role
    if (result.user.role !== 'admin') {
      return NextResponse.json(
        { 
          error: 'Access denied', 
          message: 'Admin privileges required' 
        },
        { status: 403 }
      );
    }

    // Return user data for successful authentication
    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return NextResponse.json(
      { 
        error: 'Authentication error', 
        message: 'Token verification failed' 
      },
      { status: 500 }
    );
  }
}

/**
 * Higher-order function to wrap API route handlers with authentication
 * @param {Function} handler - The API route handler function
 * @returns {Function} - Wrapped handler with authentication
 */
export function withAuth(handler) {
  return async (request, context) => {
    // Authenticate the request
    const authResult = await authenticateAdmin(request);
    
    // If authentication failed, return the error response
    if (!authResult.success) {
      return authResult;
    }

    // Add user to request context for the handler
    request.user = authResult.user;
    
    // Call the original handler
    return handler(request, context);
  };
}
