"use client";

import React from 'react';
import { Github, Heart, Shield, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-neutral-900/40 relative overflow-hidden group/footer transition-all duration-500 hover:bg-white/70 dark:hover:bg-neutral-900/70 hover:shadow-lg">
     
      <div className="absolute inset-0 pointer-events-none opacity-5 group-hover/footer:opacity-10 transition-opacity duration-500">
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" }}
        />
      </div>
      
     
      <div className="absolute inset-0 opacity-0 group-hover/footer:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
      </div>
    
      <div className="absolute top-2 right-10 opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300 pointer-events-none">
        <Sparkles className="w-3 h-3 text-yellow-400 dark:text-yellow-300 animate-pulse" />
      </div>
      <div className="absolute bottom-3 left-20 opacity-0 group-hover/footer:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
        <Sparkles className="w-2.5 h-2.5 text-blue-400 dark:text-blue-300 animate-pulse" />
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 group/credit">
          <span className="inline-flex items-center gap-1.5 transition-all duration-300 group-hover/credit:scale-105">
            <span className="transition-transform duration-500 group-hover/credit:rotate-12">Made with</span>
            <Heart className="w-4 h-4 text-pink-500 animate-pulse transition-all duration-300 group-hover/credit:scale-125 group-hover/credit:text-pink-600 dark:group-hover/credit:text-pink-400 group-hover/credit:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" /> 
            <span className="transition-transform duration-500 group-hover/credit:-rotate-12">by</span>
            <span className="font-semibold text-gray-900 dark:text-white transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 dark:hover:from-blue-400 dark:hover:via-purple-400 dark:hover:to-pink-400 cursor-default hover:scale-110 inline-block hover:drop-shadow-[0_2px_8px_rgba(79,70,229,0.3)]">
              Manya Shukla
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com/MANYA-SHUKLA/password-vault"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group/link hover:scale-110 hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] dark:hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
          >
            <Github className="w-4 h-4 transition-all duration-300 group-hover/link:scale-125 group-hover/link:rotate-[360deg] group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400" />
            <span className="relative overflow-hidden group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400 transition-colors duration-300">
              <span className="inline-block transition-transform duration-300 group-hover/link:-translate-y-full">Source</span>
              <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0">Source</span>
            </span>
          </a>
          <span className="text-gray-400 transition-all duration-300 group-hover/footer:text-gray-600 dark:group-hover/footer:text-gray-300 group-hover/footer:scale-125">•</span>
          <div className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 group/vault transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 hover:scale-105 cursor-default">
            <Shield className="w-3.5 h-3.5 transition-all duration-500 group-hover/vault:scale-125 group-hover/vault:rotate-[360deg] group-hover/vault:text-green-600 dark:group-hover/vault:text-green-400 group-hover/vault:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="transition-all duration-300 group-hover/vault:font-semibold">© {new Date().getFullYear()} Secure Vault</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
