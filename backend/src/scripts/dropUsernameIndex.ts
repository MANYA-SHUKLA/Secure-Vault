import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const dropUsernameIndex = async () => {
  try {
 
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/password-vault';
    await mongoose.connect(mongoUri);
    
    console.log('Connected to MongoDB');
    
  
    const db = mongoose.connection.db;
    const usersCollection = db?.collection('users');
    
    if (!usersCollection) {
      throw new Error('Users collection not found');
    }
    
   
    const indexes = await usersCollection.indexes();
    console.log('Current indexes:', indexes);
    
  
    const usernameIndexExists = indexes.some(index => 
      index.key && 'username' in index.key
    );
    
    if (usernameIndexExists) {
      await usersCollection.dropIndex('username_1');
      console.log('✅ Successfully dropped username_1 index');
    } else {
      console.log('ℹ️  No username index found - nothing to drop');
    }
    
    
    const remainingIndexes = await usersCollection.indexes();
    console.log('Remaining indexes:', remainingIndexes);
    
  } catch (error) {
    console.error('Error dropping index:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

dropUsernameIndex();
