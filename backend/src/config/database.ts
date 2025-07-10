import mongoose from 'mongoose';
import { config } from './environment';

/**
 * Database connection configuration and utilities
 */
export class DatabaseConfig {
  /**
   * Establishes connection to MongoDB database
   * @returns Promise that resolves when connection is established
   */
  public static async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }

  /**
   * Closes the database connection
   * @returns Promise that resolves when connection is closed
   */
  public static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  /**
   * Sets up database connection event listeners
   */
  public static setupEventListeners(): void {
    mongoose.connection.on('connected', () => {
      console.log('📊 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
      await DatabaseConfig.disconnect();
      process.exit(0);
    });
  }
}