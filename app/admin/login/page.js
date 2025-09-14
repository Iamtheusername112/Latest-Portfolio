"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/admin/login-form";

export default function AdminLoginPage() {
  const { isAuthenticated, isLoading, login } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogin = async (credentials) => {
    console.log("Login page handleLogin called with:", credentials);
    const result = await login(credentials);
    if (result.success) {
      console.log("Login successful, redirecting...");
      // The useEffect will handle the redirect
      return true;
    } else {
      console.log("Login failed:", result.error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect to admin dashboard
  }

  return <LoginForm onLogin={handleLogin} />;
}
