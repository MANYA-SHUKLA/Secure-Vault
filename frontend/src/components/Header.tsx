'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield, User, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="shadow-sm border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-neutral-800/95 transition-all duration-300 hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
     
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex justify-between items-center h-14 sm:h-16 group">
      
          <div className="flex items-center gap-3 group/logo cursor-default">
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-all duration-500 group-hover/logo:scale-125 group-hover/logo:rotate-[360deg] group-hover/logo:drop-shadow-[0_0_12px_rgba(37,99,235,0.6)] dark:group-hover/logo:drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" />
          
              <Sparkles className="w-3 h-3 text-yellow-400 dark:text-yellow-300 absolute -top-1 -right-1 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
            <div className="transition-all duration-300 group-hover/logo:translate-x-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-all duration-300 group-hover/logo:text-transparent group-hover/logo:bg-clip-text group-hover/logo:bg-gradient-to-r group-hover/logo:from-blue-600 group-hover/logo:via-purple-600 group-hover/logo:to-pink-600 dark:group-hover/logo:from-blue-400 dark:group-hover/logo:via-purple-400 dark:group-hover/logo:to-pink-400">
                Secure Vault
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover/logo:text-gray-900 dark:group-hover/logo:text-gray-200 group-hover/logo:font-medium">
                Your password manager
              </p>
            </div>
          </div>

         
          <div className="flex items-center gap-4">
          
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 max-w-[40vw] sm:max-w-none group/user cursor-default transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700/50">
              <User className="w-4 h-4 transition-all duration-300 group-hover/user:scale-125 group-hover/user:text-blue-600 dark:group-hover/user:text-blue-400 group-hover/user:drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
              <span className="truncate transition-all duration-300 group-hover/user:font-semibold group-hover/user:text-gray-900 dark:group-hover/user:text-white">
                {user?.email}
              </span>
            </div>
            
       
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 dark:hover:shadow-red-600/30 hover:scale-105 group/logout border border-transparent hover:border-red-400 dark:hover:border-red-500"
            >
              <LogOut className="w-4 h-4 transition-all duration-300 group-hover/logout:translate-x-1 group-hover/logout:scale-110 group-hover/logout:rotate-12" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;