export interface VaultItem {
  _id: string;
  title: string;
  username: string;
  encryptedPassword: string;
  websiteUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VaultItemFormData {
  title: string;
  username: string;
  password: string;
  websiteUrl: string;
  notes: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}