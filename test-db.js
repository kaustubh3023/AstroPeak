import { db } from './server/DB/client.js';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // Try to query the database
    const result = await db.execute('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('Test query result:', result);
    
    // Test if the users table exists
    try {
      const tables = await db.execute('SHOW TABLES');
      console.log('✅ Available tables:', tables);
    } catch (tableError) {
      console.log('⚠️  Could not list tables (this might be normal if no tables exist yet):', tableError.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.message.includes('DATABASE_URL is missing')) {
      console.log('\n💡 You need to create a .env file with your DATABASE_URL');
      console.log('Example .env file:');
      console.log('DATABASE_URL=mysql://username:password@localhost:3306/database_name');
    }
  }
}

testDatabaseConnection(); 