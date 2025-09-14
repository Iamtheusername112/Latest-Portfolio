"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function FixAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);

  const checkAdminUsers = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check-admin');
      const data = await response.json();
      
      if (data.success) {
        setAdminUsers(data.adminUsers);
        setResult({
          success: true,
          message: `Found ${data.adminUsers.length} admin user(s)`,
          adminUsers: data.adminUsers
        });
      } else {
        setResult({
          success: false,
          error: data.error || 'Failed to check admin users'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to check admin users'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fixAdminEmail = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/fix-admin-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        // Refresh admin users list
        checkAdminUsers();
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to fix admin email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text">
            Fix Admin Email
          </CardTitle>
          <CardDescription>
            Check and fix the admin user email address
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Admin Users */}
          {adminUsers.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Current Admin Users:</h3>
              {adminUsers.map((user, index) => (
                <div key={user.id} className="p-3 bg-muted/50 rounded-lg">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {/* Result Message */}
          {result && (
            <div className={`p-4 rounded-lg ${
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
              {result.details && (
                <div className="mt-3 text-sm">
                  {result.details.oldEmail && (
                    <p><strong>Old Email:</strong> {result.details.oldEmail}</p>
                  )}
                  {result.details.newEmail && (
                    <p><strong>New Email:</strong> {result.details.newEmail}</p>
                  )}
                  {result.details.newPassword && (
                    <p><strong>New Password:</strong> {result.details.newPassword}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={checkAdminUsers}
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Admin Users'
              )}
            </Button>
            
            <Button
              onClick={fixAdminEmail}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Fixing...
                </>
              ) : (
                'Fix Admin Email'
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Instructions:
                </p>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Click "Check Admin Users" to see current admin users</li>
                  <li>Click "Fix Admin Email" to update the admin email to iwufrancis571@gmail.com</li>
                  <li>Use the updated credentials to log in</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Login Link */}
          {result?.success && result.details?.newEmail && (
            <div className="text-center">
              <a 
                href="/admin/login" 
                className="text-primary hover:underline font-medium"
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
