'use client';

import React, { useState, useCallback } from 'react';
import { generatePassword, PasswordOptions, calculatePasswordStrength } from '@/utils/passwordGenerator';
import { Copy, RefreshCw, Check, Sparkles, Zap } from 'lucide-react';

const PasswordGenerator: React.FC<{
  onPasswordGenerated: (password: string) => void;
}> = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeNumbers: true,
    includeLetters: true,
    includeSymbols: true,
    excludeLookAlikes: true,
  });

  const generateNewPassword = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      onPasswordGenerated(newPassword);
      setIsGenerating(false);
    }, 300);
  }, [options, onPasswordGenerated]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 15000); 
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const handleOptionChange = (
    key: keyof PasswordOptions,
    value: PasswordOptions[keyof PasswordOptions]
  ) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    
    
    if (password) {
      generateNewPassword();
    }
  };

  const strength = calculatePasswordStrength(password);
  const strengthColors = [
    'bg-red-500', 'bg-red-400', 'bg-orange-500', 'bg-orange-400',
    'bg-yellow-500', 'bg-yellow-400', 'bg-green-500', 'bg-green-400'
  ];

  return (
    <div className="relative bg-white/90 dark:bg-neutral-800/90 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 p-6 overflow-hidden backdrop-blur transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group/generator">
      
      <div
        className="absolute -z-10 inset-0 opacity-10 group-hover/generator:opacity-15 transition-opacity duration-500"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=40')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    
      <div className="absolute -z-10 -top-16 -right-16 w-48 h-48 bg-blue-300 dark:bg-blue-500/30 rounded-full blur-3xl opacity-60 animate-blob" />
      <div className="absolute -z-10 -bottom-16 -left-16 w-48 h-48 bg-purple-300 dark:bg-purple-500/30 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000" />
      
   
      <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400 dark:text-yellow-300 opacity-0 group-hover/generator:opacity-100 transition-all duration-300 animate-pulse" />
      <Zap className="absolute bottom-4 left-4 w-4 h-4 text-blue-400 dark:text-blue-300 opacity-0 group-hover/generator:opacity-100 transition-all duration-500 delay-100 animate-pulse" />
      
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-all duration-300 group-hover/generator:text-transparent group-hover/generator:bg-clip-text group-hover/generator:bg-gradient-to-r group-hover/generator:from-blue-600 group-hover/generator:via-purple-600 group-hover/generator:to-pink-600 dark:group-hover/generator:from-blue-400 dark:group-hover/generator:via-purple-400 dark:group-hover/generator:to-pink-400 flex items-center gap-2">
        <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover/generator:rotate-12 group-hover/generator:scale-110" />
        Password Generator
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={password}
            readOnly
            className={`flex-1 px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md font-mono text-sm bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-gray-900 dark:text-white hover:shadow-md transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 focus:ring-2 focus:ring-blue-500 ${isGenerating ? 'animate-pulse' : ''}`}
            placeholder="Generated password will appear here"
          />
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg group/copy relative"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 animate-bounce" />
            ) : (
              <Copy className="w-5 h-5 group-hover/copy:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            )}
          </button>
          <button
            onClick={generateNewPassword}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 hover:scale-125 hover:rotate-[360deg] hover:shadow-lg group/refresh"
            title="Generate new password"
          >
            <RefreshCw className={`w-5 h-5 group-hover/refresh:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)] ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
  
        {password && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="flex-1 h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden relative group/strength">
              <div
                className={`h-full transition-all duration-500 ${strengthColors[strength - 1] || 'bg-gray-300'} relative overflow-hidden`}
                style={{ width: `${(strength / 8) * 100}%` }}
              >
              
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite] group-hover/strength:animate-[shimmer_1s_infinite]" />
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[80px] font-semibold transition-all duration-300 group-hover/generator:text-gray-900 dark:group-hover/generator:text-gray-200">
              Strength: {strength}/8
            </span>
          </div>
        )}
      </div>

      
      <div className="space-y-4">
     
        <div className="group/slider">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-all duration-300 group-hover/slider:text-blue-600 dark:group-hover/slider:text-blue-400 group-hover/slider:font-semibold">
            Length: <span className="text-blue-600 dark:text-blue-400 font-bold">{options.length}</span> characters
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={options.length}
            onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer hover:shadow-md transition-all duration-300 hover:h-3 hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900 dark:hover:to-purple-900"
          />
        </div>

    
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 cursor-pointer group/option">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 focus:ring-blue-500 transition-transform hover:scale-110 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover/option:font-semibold group-hover/option:text-blue-600 dark:group-hover/option:text-blue-400">Numbers</span>
          </label>

          <label className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 cursor-pointer group/option">
            <input
              type="checkbox"
              checked={options.includeLetters}
              onChange={(e) => handleOptionChange('includeLetters', e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 focus:ring-blue-500 transition-transform hover:scale-110 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover/option:font-semibold group-hover/option:text-purple-600 dark:group-hover/option:text-purple-400">Letters</span>
          </label>

          <label className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:scale-105 cursor-pointer group/option">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 focus:ring-blue-500 transition-transform hover:scale-110 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover/option:font-semibold group-hover/option:text-pink-600 dark:group-hover/option:text-pink-400">Symbols</span>
          </label>

          <label className="flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105 cursor-pointer group/option">
            <input
              type="checkbox"
              checked={options.excludeLookAlikes}
              onChange={(e) => handleOptionChange('excludeLookAlikes', e.target.checked)}
              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 focus:ring-blue-500 transition-transform hover:scale-110 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 group-hover/option:font-semibold group-hover/option:text-green-600 dark:group-hover/option:text-green-400">Exclude look-alikes</span>
          </label>
        </div>

 
        <button
          onClick={generateNewPassword}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group/generate relative overflow-hidden"
        >
      
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/generate:translate-x-[200%] transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-2 font-semibold">
            <Zap className={`w-4 h-4 transition-all duration-300 group-hover/generate:scale-125 group-hover/generate:rotate-12 ${isGenerating ? 'animate-pulse' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Password'}
            <Sparkles className={`w-4 h-4 transition-all duration-300 group-hover/generate:scale-125 group-hover/generate:-rotate-12 ${isGenerating ? 'animate-pulse' : ''}`} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;