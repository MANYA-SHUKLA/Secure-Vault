import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const cleanupUnusedIndexes = async () => {
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
    
    
    const indexesToDrop = [
      'emailVerificationToken_1',
      'passwordResetToken_1'
    ];
    
    let droppedCount = 0;
    
    for (const indexName of indexesToDrop) {
      const indexExists = indexes.some(index => index.name === indexName);
      
      if (indexExists) {
        try {
          await usersCollection.dropIndex(indexName);
          console.log(`✅ Successfully dropped ${indexName} index`);
          droppedCount++;
        } catch (error) {
          console.error(`❌ Failed to drop ${indexName}:`, error);
        }
      }
    }
    
    if (droppedCount === 0) {
      console.log('ℹ️  No unused indexes found - nothing to drop');
    } else {
      console.log(`\n✅ Total indexes dropped: ${droppedCount}`);
    }
    
    
    const remainingIndexes = await usersCollection.indexes();
    console.log('\nRemaining indexes:', remainingIndexes);
    
  } catch (error) {
    console.error('Error cleaning up indexes:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  }
};

cleanupUnusedIndexes();
