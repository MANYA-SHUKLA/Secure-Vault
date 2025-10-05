'use client';

import React, { useState, useEffect } from 'react';
import { VaultItem as VaultItemType, VaultItemFormData } from '@/types/vault';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { createEncryptionService, EncryptionService } from '@/utils/encryption';
import VaultItem from './VaultItem';
import VaultItemForm from './VaultItemForm';
import PasswordGenerator from './PasswordGenerator';
import { Search, Plus, Shield, AlertCircle } from 'lucide-react';

const Vault: React.FC = () => {
  const { user, token } = useAuth();
  const [vaultItems, setVaultItems] = useState<VaultItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<VaultItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<VaultItemType | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [encryptionService, setEncryptionService] = useState<EncryptionService | null>(null);

  useEffect(() => {
    if (user && token) {
      const masterPassword = prompt('Enter your master password to decrypt your vault:');
      if (masterPassword) {
        setEncryptionService(createEncryptionService(masterPassword, user.email));
        loadVaultItems();
      } else {
        setError('Master password is required to access the vault');
      }
    }
  }, [user, token]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(vaultItems);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = vaultItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.username.toLowerCase().includes(query) ||
        (item.websiteUrl && item.websiteUrl.toLowerCase().includes(query)) ||
        (item.notes && item.notes.toLowerCase().includes(query))
      );
      setFilteredItems(filtered);
    }
  }, [vaultItems, searchQuery]);

  const loadVaultItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const items = await apiClient.get<VaultItemType[]>('/vault');
      setVaultItems(items);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load vault items';
      setError(message);
      console.error('Error loading vault items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateItem = async (formData: VaultItemFormData) => {
    if (!encryptionService) {
      setError('Encryption service not initialized');
      return;
    }

    try {
      const encryptedPassword = encryptionService.encrypt(formData.password);
      
      const newItem = await apiClient.post<VaultItemType>('/vault', {
        title: formData.title,
        username: formData.username,
        encryptedPassword,
        websiteUrl: formData.websiteUrl,
        notes: formData.notes
      });

      setVaultItems(prev => [newItem, ...prev]);
      setShowForm(false);
      setGeneratedPassword('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create vault item';
      setError(message);
    }
  };

  const handleUpdateItem = async (formData: VaultItemFormData) => {
    if (!encryptionService || !editingItem) {
      setError('Encryption service not initialized or no item selected');
      return;
    }

    try {
      const encryptedPassword = encryptionService.encrypt(formData.password);
      
      const updatedItem = await apiClient.put<VaultItemType>(`/vault/${editingItem._id}`, {
        title: formData.title,
        username: formData.username,
        encryptedPassword,
        websiteUrl: formData.websiteUrl,
        notes: formData.notes
      });

      setVaultItems(prev => prev.map(item => 
        item._id === editingItem._id ? updatedItem : item
      ));
      setEditingItem(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update vault item';
      setError(message);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await apiClient.delete(`/vault/${id}`);
      setVaultItems(prev => prev.filter(item => item._id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete vault item';
      setError(message);
    }
  };

  const handleCopy = async (text: string, _type: string) => {
    void _type; // mark parameter as used to satisfy eslint
    try {
      await navigator.clipboard.writeText(text);
      // Success is handled in the individual component
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const decryptPassword = (encryptedPassword: string): string => {
    if (!encryptionService) return '••••••••';
    try {
      return encryptionService.decrypt(encryptedPassword);
    } catch (err) {
      console.error('Failed to decrypt password:', err);
      return 'Decryption failed';
    }
  };

  const handleEdit = (item: VaultItemType) => {
    if (!encryptionService) {
      setError('Encryption service not initialized');
      return;
    }

    const decryptedPassword = decryptPassword(item.encryptedPassword);
    setEditingItem({
      ...item,
      encryptedPassword: decryptedPassword
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Decorative background for vault area */}
      <div className="absolute -z-10 inset-0 pointer-events-none select-none overflow-hidden">
        {/* Light texture */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10 transition-opacity duration-500 hover:opacity-25 dark:hover:opacity-15"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-linen.png')" }}
        />
        {/* Background image with blur */}
        <div
          className="absolute inset-y-0 right-0 w-[50%] opacity-20 blur-2xl transition-all duration-700 hover:opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group/header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-fade-in-down transition-all duration-300 hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-400 dark:hover:to-pink-400 cursor-default">Your Vault</h1>
          <p className="text-gray-600 dark:text-gray-400 animate-fade-in transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-200 hover:font-medium cursor-default">Securely manage your passwords</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 hover:scale-105 group/add relative overflow-hidden"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/add:translate-x-[200%] transition-transform duration-700" />
          <Plus className="w-4 h-4 relative z-10 transition-all duration-300 group-hover/add:scale-125 group-hover/add:rotate-90" />
          <span className="relative z-10 font-semibold">Add Item</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md animate-shake relative overflow-hidden group/error">
          {/* Animated pulsing border */}
          <div className="absolute inset-0 border-2 border-red-400 dark:border-red-600 rounded-md animate-pulse" />
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 animate-pulse relative z-10" />
          <p className="text-red-700 dark:text-red-400 text-sm relative z-10">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 relative z-10 text-xl font-bold transition-all duration-300 hover:scale-125 hover:rotate-90"
          >
            ×
          </button>
        </div>
      )}

      {/* Password Generator */}
      <PasswordGenerator onPasswordGenerated={setGeneratedPassword} />

      {/* Search Bar */}
      <div className="relative group/search">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 transition-all duration-300 group-focus-within/search:text-blue-500 group-focus-within/search:scale-125 group-focus-within/search:rotate-12" />
        <input
          type="text"
          placeholder="Search vault items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 focus:scale-[1.01]"
        />
      </div>

      {/* Vault Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 group/empty animate-fade-in">
          <Shield className="mx-auto w-12 h-12 text-gray-400 dark:text-gray-600 mb-4 transition-all duration-500 group-hover/empty:scale-125 group-hover/empty:rotate-[360deg] group-hover/empty:text-blue-500 dark:group-hover/empty:text-blue-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-all duration-300 group-hover/empty:text-transparent group-hover/empty:bg-clip-text group-hover/empty:bg-gradient-to-r group-hover/empty:from-blue-600 group-hover/empty:to-purple-600 dark:group-hover/empty:from-blue-400 dark:group-hover/empty:to-purple-400">
            {searchQuery ? 'No matching items found' : 'No passwords yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 group-hover/empty:text-gray-900 dark:group-hover/empty:text-gray-200">
            {searchQuery 
              ? 'Try adjusting your search terms'
              : 'Get started by adding your first password'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-110 hover:-translate-y-1 group/btn relative overflow-hidden"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <Plus className="w-4 h-4 relative z-10 transition-all duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-90" />
              <span className="relative z-10 font-semibold">Add Your First Item</span>
            </button>
          )}
        </div>
      ) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <VaultItem
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDeleteItem}
              onCopy={handleCopy}
              decryptedPassword={decryptPassword(item.encryptedPassword)}
            />
          ))}
        </div>
      )}

      {/* Forms */}
      {showForm && (
        <VaultItemForm
          onSubmit={handleCreateItem}
          onCancel={() => {
            setShowForm(false);
            setGeneratedPassword('');
          }}
          generatedPassword={generatedPassword}
        />
      )}

      {editingItem && (
        <VaultItemForm
          onSubmit={handleUpdateItem}
          onCancel={() => setEditingItem(null)}
          initialData={{
            title: editingItem.title,
            username: editingItem.username,
            password: decryptPassword(editingItem.encryptedPassword),
            websiteUrl: editingItem.websiteUrl || '',
            notes: editingItem.notes || ''
          }}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default Vault;