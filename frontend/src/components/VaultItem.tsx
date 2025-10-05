'use client';

import React, { useState } from 'react';
import { VaultItem as VaultItemType } from '@/types/vault';
import { Copy, Edit, Trash2, Eye, EyeOff, Globe, User, Check, Lock, Sparkles } from 'lucide-react';

interface VaultItemProps {
  item: VaultItemType;
  onEdit: (item: VaultItemType) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string, type: string) => void;
  decryptedPassword: string;
}

const VaultItem: React.FC<VaultItemProps> = ({
  item,
  onEdit,
  onDelete,
  onCopy,
  decryptedPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    await onCopy(text, field);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
  <div className="bg-white/90 dark:bg-neutral-800/90 rounded-lg border border-gray-200 dark:border-neutral-700 p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur group/card relative overflow-hidden">
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>
      
      {/* Sparkle decoration */}
      <Sparkles className="absolute top-2 right-2 w-3 h-3 text-yellow-400 dark:text-yellow-300 opacity-0 group-hover/card:opacity-100 transition-all duration-300 animate-pulse" />
      
      <div className="flex items-start justify-between mb-3 relative z-10">
  <h3 className="font-semibold text-lg text-gray-800 dark:text-neutral-100 truncate flex-1 transition-all duration-300 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-blue-600 group-hover/card:via-purple-600 group-hover/card:to-pink-600 dark:group-hover/card:from-blue-400 dark:group-hover/card:via-purple-400 dark:group-hover/card:to-pink-400">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-500 transition-all duration-300 hover:scale-125 hover:rotate-12 group/edit"
            title="Edit"
          >
            <Edit className="w-4 h-4 group-hover/edit:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-500 transition-all duration-300 hover:scale-125 hover:rotate-12 group/delete"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 group-hover/delete:drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
          </button>
        </div>
      </div>

      {/* Username */}
      <div className="flex items-center gap-2 mb-2 relative z-10 group/field p-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
        <User className="w-4 h-4 text-gray-400 flex-shrink-0 transition-all duration-300 group-hover/field:text-blue-500 group-hover/field:scale-125" />
  <span className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1 transition-all duration-200 group-hover/field:font-semibold group-hover/field:text-gray-900 dark:group-hover/field:text-white">
          {item.username}
        </span>
        <button
          onClick={() => handleCopy(item.username, 'username')}
          className="p-1 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-500 transition-all duration-300 flex-shrink-0 hover:scale-125 hover:rotate-12 group/copy"
          title="Copy username"
        >
          {copiedField === 'username' ? (
            <Check className="w-3 h-3 text-green-600 animate-bounce" />
          ) : (
            <Copy className="w-3 h-3 group-hover/copy:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          )}
        </button>
      </div>

      {/* Password */}
      <div className="flex items-center gap-2 mb-3 relative z-10 group/field p-2 rounded-md transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20">
  <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-all duration-300 group-hover/field:text-purple-500 group-hover/field:scale-125 group-hover/field:rotate-12" />
  <span className="text-sm font-mono truncate flex-1 text-gray-800 dark:text-neutral-100 transition-all duration-200 group-hover/field:font-semibold">
          {showPassword ? decryptedPassword : '•'.repeat(12)}
        </span>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 text-gray-400 hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-500 transition-all duration-300 hover:scale-125 hover:rotate-12 group/eye"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-3 h-3 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            ) : (
              <Eye className="w-3 h-3 group-hover/eye:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            )}
          </button>
          <button
            onClick={() => handleCopy(decryptedPassword, 'password')}
            className="p-1 text-gray-400 hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-500 transition-all duration-300 hover:scale-125 hover:rotate-12 group/copy"
            title="Copy password"
          >
            {copiedField === 'password' ? (
              <Check className="w-3 h-3 text-green-600 animate-bounce" />
            ) : (
              <Copy className="w-3 h-3 group-hover/copy:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            )}
          </button>
        </div>
      </div>

      {/* Website URL */}
      {item.websiteUrl && (
        <div className="flex items-center gap-2 mb-3 relative z-10 group/field p-2 rounded-md transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900/20">
          <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-all duration-300 group-hover/field:text-green-500 group-hover/field:scale-125 group-hover/field:rotate-[360deg]" />
          <a
            href={item.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate flex-1 transition-all duration-200 hover:underline underline-offset-2 group-hover/field:font-semibold"
          >
            {item.websiteUrl}
          </a>
          <button
            onClick={() => handleCopy(item.websiteUrl!, 'url')}
            className="p-1 text-gray-400 hover:text-green-600 dark:text-gray-500 dark:hover:text-green-500 transition-all duration-300 flex-shrink-0 hover:scale-125 hover:rotate-12 group/copy"
            title="Copy URL"
          >
            {copiedField === 'url' ? (
              <Check className="w-3 h-3 text-green-600 animate-bounce" />
            ) : (
              <Copy className="w-3 h-3 group-hover/copy:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            )}
          </button>
        </div>
      )}

      {/* Notes */}
      {item.notes && (
        <div className="mb-3 relative z-10 p-2 rounded-md transition-all duration-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 group/notes">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 transition-all duration-200 group-hover/notes:text-gray-900 dark:group-hover/notes:text-white group-hover/notes:font-medium">{item.notes}</p>
        </div>
      )}

      {/* Date */}
  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-neutral-700 relative z-10 group/date">
  <span className="text-xs text-gray-400 dark:text-gray-500 transition-all duration-200 group-hover/date:text-gray-600 dark:group-hover/date:text-gray-400 group-hover/date:font-semibold">
          Updated: {formatDate(item.updatedAt)}
        </span>
  <span className="text-xs text-gray-400 dark:text-gray-500 transition-all duration-200 group-hover/date:text-gray-600 dark:group-hover/date:text-gray-400 group-hover/date:font-semibold">
          Created: {formatDate(item.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default VaultItem;