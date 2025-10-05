'use client';

import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import Vault from '@/components/Vault';
import Header from '@/components/Header';

function AuthWrapper() {
  const { user, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        {/* Loading background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300 dark:bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading your secure vault...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="animate-fade-in">
        {isLogin ? (
          <LoginForm switchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 animate-fade-in overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <Vault />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}