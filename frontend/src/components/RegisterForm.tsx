'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle, UserPlus, CheckCircle, User, Sparkles, Shield, Star } from 'lucide-react';

const RegisterForm: React.FC<{
  switchToLogin: () => void;
}> = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password);
      setSuccess('Account created successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-neutral-900 dark:via-purple-900/20 dark:to-blue-900/20 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background shapes */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-40 w-80 h-80 bg-blue-300 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 right-10 w-4 h-4 text-pink-400 dark:text-pink-300 animate-pulse opacity-60" />
        <Sparkles className="absolute top-1/3 left-10 w-3 h-3 text-purple-400 dark:text-purple-300 animate-pulse opacity-50 animation-delay-2000" />
        <Sparkles className="absolute bottom-1/3 right-1/4 w-3.5 h-3.5 text-blue-400 dark:text-blue-300 animate-pulse opacity-70 animation-delay-4000" />
        <Shield className="absolute bottom-20 left-10 w-5 h-5 text-purple-400 dark:text-purple-300 animate-pulse opacity-40 animation-delay-2000" />
        <Star className="absolute top-1/2 right-16 w-3 h-3 text-pink-400 dark:text-pink-300 animate-pulse opacity-50 animation-delay-4000" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo with animation */}
        <div className="text-center animate-fade-in-down group/logo">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-125 transition-all duration-500 hover:rotate-[360deg] hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer relative">
            <UserPlus className="h-8 w-8 text-white transition-transform duration-500 group-hover/logo:scale-110" />
            {/* Multiple sparkles on hover */}
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 animate-pulse" />
            <Star className="absolute -bottom-1 -left-1 w-3 h-3 text-pink-300 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 delay-100 animate-pulse" />
          </div>
          <h2 className="mt-6 text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-all duration-300 hover:from-pink-600 hover:to-blue-600 dark:hover:from-pink-400 dark:hover:to-blue-400 cursor-default">
            Create your vault
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-200 hover:font-medium cursor-default">
            Join thousands protecting their passwords
          </p>
        </div>

        <form className="mt-8 space-y-6 animate-fade-in-up bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-neutral-700 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] group/form" onSubmit={handleSubmit}>
          {/* Decorative gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse" />
          </div>
          
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 animate-shake backdrop-blur-sm border border-red-200 dark:border-red-800 relative overflow-hidden group/error">
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-red-400 dark:border-red-600 rounded-lg animate-pulse" />
              <div className="flex relative z-10">
                <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-400">{error}</h3>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 animate-fade-in backdrop-blur-sm border border-green-200 dark:border-green-800 relative overflow-hidden group/success">
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-green-400 dark:border-green-600 rounded-lg animate-pulse" />
              <div className="flex relative z-10">
                <CheckCircle className="h-5 w-5 text-green-400 animate-bounce" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-400">{success}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 relative z-10">
            <div className="group/input">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within/input:text-purple-600 dark:group-focus-within/input:text-purple-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within/input:text-purple-500 transition-all duration-300 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-3 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 focus:scale-[1.02]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="group/input">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within/input:text-purple-600 dark:group-focus-within/input:text-purple-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within/input:text-purple-500 transition-all duration-300 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-3 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 focus:scale-[1.02]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="group/input">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within/input:text-purple-600 dark:group-focus-within/input:text-purple-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within/input:text-purple-500 transition-all duration-300 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 focus:scale-[1.02]"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-125 hover:rotate-12 group/eye"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  ) : (
                    <Eye className="w-5 h-5 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  )}
                </button>
              </div>
            </div>

            <div className="group/input">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-focus-within/input:text-purple-600 dark:group-focus-within/input:text-purple-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 group-focus-within/input:text-purple-500 transition-all duration-300 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 focus:scale-[1.02]"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-125 hover:rotate-12 group/eye"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  ) : (
                    <Eye className="w-5 h-5 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <button
              type="submit"
              disabled={isLoading}
              className="group/submit relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/submit:translate-x-[200%] transition-transform duration-700" />
              
              {isLoading ? (
                <div className="flex items-center gap-2 relative z-10">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 relative z-10">
                  <UserPlus className="w-4 h-4 transition-all duration-300 group-hover/submit:scale-125 group-hover/submit:rotate-12" />
                  <span className="font-semibold">Create account</span>
                  <svg className="w-4 h-4 transition-all duration-300 group-hover/submit:translate-x-2 group-hover/submit:scale-125" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>

          <div className="text-center relative z-10">
            <button
              type="button"
              onClick={switchToLogin}
              className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 text-sm font-medium transition-all duration-300 hover:underline underline-offset-4 group/switch hover:scale-105 inline-block"
            >
              Already have an account? <span className="font-bold transition-all duration-300 group-hover/switch:text-transparent group-hover/switch:bg-clip-text group-hover/switch:bg-gradient-to-r group-hover/switch:from-pink-600 group-hover/switch:to-blue-600 dark:group-hover/switch:from-pink-400 dark:group-hover/switch:to-blue-400">Sign in</span>
              <Star className="inline-block w-3 h-3 ml-1 opacity-0 group-hover/switch:opacity-100 transition-opacity duration-300 animate-pulse" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;