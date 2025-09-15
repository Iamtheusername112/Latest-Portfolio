/**
 * Security configuration for the portfolio application
 */

export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },

  // Session security
  SESSION: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },

  // Rate limiting
  RATE_LIMIT: {
    login: {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    api: {
      maxAttempts: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    admin: {
      maxAttempts: 200,
      windowMs: 15 * 60 * 1000, // 15 minutes
    }
  },

  // CORS configuration
  CORS: {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.NEXT_PUBLIC_APP_URL] 
      : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  },

  // Security headers
  HEADERS: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';",
  },

  // File upload security
  UPLOAD: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    scanForMalware: true,
  },

  // Database security
  DATABASE: {
    connectionLimit: 10,
    queryTimeout: 30000, // 30 seconds
    enableLogging: process.env.NODE_ENV === 'development',
  },

  // Admin security
  ADMIN: {
    allowedEmails: ['iwufrancis571@gmail.com'],
    requireMFA: false, // Set to true for production
    sessionTimeout: 2 * 60 * 60 * 1000, // 2 hours
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result
 */
export function validatePassword(password) {
  const errors = [];
  
  if (password.length < SECURITY_CONFIG.PASSWORD.minLength) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD.minLength} characters long`);
  }
  
  if (SECURITY_CONFIG.PASSWORD.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (SECURITY_CONFIG.PASSWORD.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (SECURITY_CONFIG.PASSWORD.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[;]/g, '') // Remove semicolons
    .substring(0, 1000); // Limit length
}

/**
 * Generate secure random string
 * @param {number} length - Length of string to generate
 * @returns {string} - Random string
 */
export function generateSecureToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}
