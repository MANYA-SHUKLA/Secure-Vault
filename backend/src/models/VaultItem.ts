import mongoose, { Document, Schema } from 'mongoose';

export interface IVaultItem extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  username: string;
  encryptedPassword: string;
  websiteUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const vaultItemSchema = new Schema<IVaultItem>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient user-based queries
vaultItemSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IVaultItem>('VaultItem', vaultItemSchema);