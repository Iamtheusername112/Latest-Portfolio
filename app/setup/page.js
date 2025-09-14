"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [result, setResult] = useState(null);

  const createAdmin = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // First test database connection
      console.log('🧪 Testing database connection...');
      const testResponse = await fetch('/api/test-db', {
        method: 'GET',
      });
      const testData = await testResponse.json();
      console.log('Database test result:', testData);

      // Then create admin user
      console.log('🔐 Creating admin user...');
      const response = await fetch('/api/test-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Admin creation result:', data);
      setResult(data);
    } catch (error) {
      console.error('Setup error:', error);
      setResult({
        success: false,
        error: 'Failed to create admin user',
        details: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fixAdmin = async () => {
    setIsFixing(true);
    setResult(null);

    try {
      console.log('🔧 Fixing admin user...');
      const response = await fetch('/api/fix-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Fix admin result:', data);
      setResult(data);
    } catch (error) {
      console.error('Fix admin error:', error);
      setResult({
        success: false,
        error: 'Failed to fix admin user',
        details: error.message
      });
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text">
            Admin Setup
          </CardTitle>
          <CardDescription>
            Create the admin user for your portfolio
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!result && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to create your admin user with the following credentials:
              </p>
              <div className="bg-muted/50 p-3 rounded-md text-sm">
                <p><strong>Email:</strong> iwufrancis571@gmail.com</p>
                <p><strong>Password:</strong> PortfolioAdmin2024!</p>
              </div>
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-md ${
              result.success 
                ? 'bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800' 
                : 'bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {result.success ? 'Success!' : 'Error'}
                </span>
              </div>
              <p className={`text-sm mt-2 ${
                result.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {result.message || result.error}
              </p>
              {result.admin && (
                <div className="mt-3 text-sm">
                  <p><strong>Email:</strong> {result.admin.email}</p>
                  <p><strong>Name:</strong> {result.admin.name}</p>
                  <p><strong>Role:</strong> {result.admin.role}</p>
                </div>
              )}
              {result.details && (
                <p className="text-xs mt-2 opacity-75">
                  {result.details}
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={createAdmin}
              disabled={isLoading || isFixing}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Admin...
                </>
              ) : (
                'Create Admin User'
              )}
            </Button>
            
            <Button
              onClick={fixAdmin}
              disabled={isLoading || isFixing}
              variant="outline"
              className="w-full"
            >
              {isFixing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Fixing Admin...
                </>
              ) : (
                'Fix Existing Admin'
              )}
            </Button>
          </div>

          {result?.success && (
            <div className="text-center">
              <a 
                href="/admin/login" 
                className="text-sm text-primary hover:underline"
              >
                Go to Admin Login →
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
