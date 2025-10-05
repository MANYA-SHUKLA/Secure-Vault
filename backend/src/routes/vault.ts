import express from 'express';
import VaultItem from '../models/VaultItem';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all vault items for user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const vaultItems = await VaultItem.find({ userId: req.user!.userId })
      .sort({ createdAt: -1 });
    
    res.json(vaultItems);
  } catch (error) {
    console.error('Get vault items error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new vault item
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, username, encryptedPassword, websiteUrl, notes } = req.body;

    if (!title || !username || !encryptedPassword) {
      return res.status(400).json({ 
        message: 'Title, username, and encrypted password are required' 
      });
    }

    const vaultItem = new VaultItem({
      userId: req.user!.userId,
      title,
      username,
      encryptedPassword,
      websiteUrl,
      notes
    });

    await vaultItem.save();
    res.status(201).json(vaultItem);
  } catch (error) {
    console.error('Create vault item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update vault item
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, username, encryptedPassword, websiteUrl, notes } = req.body;

    const vaultItem = await VaultItem.findOne({
      _id: req.params.id,
      userId: req.user!.userId
    });

    if (!vaultItem) {
      return res.status(404).json({ message: 'Vault item not found' });
    }

    vaultItem.title = title || vaultItem.title;
    vaultItem.username = username || vaultItem.username;
    vaultItem.encryptedPassword = encryptedPassword || vaultItem.encryptedPassword;
    vaultItem.websiteUrl = websiteUrl;
    vaultItem.notes = notes;

    await vaultItem.save();
    res.json(vaultItem);
  } catch (error) {
    console.error('Update vault item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete vault item
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const vaultItem = await VaultItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.userId
    });

    if (!vaultItem) {
      return res.status(404).json({ message: 'Vault item not found' });
    }

    res.json({ message: 'Vault item deleted successfully' });
  } catch (error) {
    console.error('Delete vault item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;