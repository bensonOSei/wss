import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment variable validation schema
 */
const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default(3000),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/senyoquotes'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
});

/**
 * Validated environment configuration
 */
const validateEnvironment = () => {
  try {
    return environmentSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    process.exit(1);
  }
};

/**
 * Exported environment configuration with type safety
 */
export const config = validateEnvironment();

/**
 * Environment configuration type
 */
export type Environment = z.infer<typeof environmentSchema>;