'use client';

import React, { useState, useEffect } from 'react';
import { VaultItemFormData } from '@/types/vault';
import { Eye, EyeOff, Globe, User, Lock, FileText, Sparkles, Save, X } from 'lucide-react';

interface VaultItemFormProps {
  onSubmit: (data: VaultItemFormData) => void;
  onCancel: () => void;
  initialData?: VaultItemFormData;
  isEditing?: boolean;
  generatedPassword?: string;
}

const VaultItemForm: React.FC<VaultItemFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  generatedPassword = ''
}) => {
  const [formData, setFormData] = useState<VaultItemFormData>({
    title: '',
    username: '',
    password: '',
    websiteUrl: '',
    notes: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (generatedPassword && !isEditing) {
      setFormData(prev => ({ ...prev, password: generatedPassword }));
    }
  }, [generatedPassword, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.username || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field: keyof VaultItemFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in">
      <div className="relative bg-white/95 dark:bg-neutral-800/95 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-neutral-700 animate-fade-in-up group/modal backdrop-blur-xl">
        {/* Decorative background image */}
        <div
          className="absolute -z-10 inset-0 opacity-10 group-hover/modal:opacity-15 transition-opacity duration-500"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=40')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-700 pointer-events-none rounded-t-2xl sm:rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        </div>
        
        {/* Sparkle decorations */}
        <Sparkles className="absolute top-4 right-4 w-4 h-4 text-yellow-400 dark:text-yellow-300 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300 animate-pulse z-10" />
        <Sparkles className="absolute bottom-6 left-6 w-3 h-3 text-blue-400 dark:text-blue-300 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-500 delay-100 animate-pulse z-10" />
        
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover/modal:text-transparent group-hover/modal:bg-clip-text group-hover/modal:bg-gradient-to-r group-hover/modal:from-blue-600 group-hover/modal:via-purple-600 group-hover/modal:to-pink-600 dark:group-hover/modal:from-blue-400 dark:group-hover/modal:via-purple-400 dark:group-hover/modal:to-pink-400">
              {isEditing ? 'Edit Vault Item' : 'Add New Vault Item'}
            </h2>
            <button
              onClick={onCancel}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-110 hover:rotate-90 group/close"
              title="Close"
            >
              <X className="w-5 h-5 group-hover/close:drop-shadow-[0_0_8px_rgba(107,114,128,0.6)]" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 group-focus-within/input:text-blue-600 dark:group-focus-within/input:text-blue-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Title *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-all duration-300 group-focus-within/input:text-blue-500 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 focus:scale-[1.02]"
                  placeholder="e.g., Gmail Account"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 group-focus-within/input:text-purple-600 dark:group-focus-within/input:text-purple-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Username/Email *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-all duration-300 group-focus-within/input:text-purple-500 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-600 focus:scale-[1.02]"
                  placeholder="username@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 group-focus-within/input:text-pink-600 dark:group-focus-within/input:text-pink-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-all duration-300 group-focus-within/input:text-pink-500 group-focus-within/input:scale-125 group-focus-within/input:rotate-12" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:shadow-lg transition-all duration-300 hover:border-pink-300 dark:hover:border-pink-600 focus:scale-[1.02]"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-125 hover:rotate-12 group/eye"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 group-hover/eye:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                  ) : (
                    <Eye className="w-4 h-4 group-hover/eye:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                  )}
                </button>
              </div>
            </div>

            {/* Website URL */}
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 group-focus-within/input:text-green-600 dark:group-focus-within/input:text-green-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-all duration-300 group-focus-within/input:text-green-500 group-focus-within/input:scale-125 group-focus-within/input:rotate-[360deg]" />
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => handleChange('websiteUrl', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:shadow-lg transition-all duration-300 hover:border-green-300 dark:hover:border-green-600 focus:scale-[1.02]"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 group-focus-within/input:text-indigo-600 dark:group-focus-within/input:text-indigo-400 group-focus-within/input:font-semibold group-focus-within/input:scale-105 origin-left">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 focus:scale-[1.02] resize-none"
                placeholder="Additional notes..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-700 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 hover:shadow-lg hover:scale-105 group/cancel relative overflow-hidden"
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/cancel:translate-x-[200%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2 font-medium">
                  <X className="w-4 h-4 transition-transform duration-300 group-hover/cancel:rotate-90" />
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-md hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-0.5 group/submit relative overflow-hidden"
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/submit:translate-x-[200%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2 font-semibold">
                  <Save className="w-4 h-4 transition-all duration-300 group-hover/submit:scale-125 group-hover/submit:rotate-12" />
                  {isEditing ? 'Update' : 'Save'}
                  <Sparkles className="w-3 h-3 transition-all duration-300 group-hover/submit:scale-125 group-hover/submit:-rotate-12" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaultItemForm;