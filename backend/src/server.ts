import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { DatabaseConfig } from './config/database';
import { quotesRouter } from './routes/quotes.routes';
import { errorHandler } from './middleware/error-handler';

/**
 * Express application instance
 */
const app = express();

/**
 * Configure CORS middleware
 */
app.use(cors({
  origin: "*",
  credentials: true,
}));

/**
 * Configure JSON parsing middleware
 */
app.use(express.json({ limit: '10mb' }));

/**
 * Configure URL-encoded parsing middleware
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'what-senyo-said-backend' 
  });
});

/**
 * API routes
 */
app.use('/api', quotesRouter);

/**
 * Error handling middleware (must be last)
 */
app.use(errorHandler);

/**
 * Start server and connect to database
 */
const startServer = async (): Promise<void> => {
  try {
    DatabaseConfig.setupEventListeners();
    await DatabaseConfig.connect();
    
    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
      console.log(`📊 Environment: ${config.NODE_ENV}`);
      console.log(`🌐 Health check: http://localhost:${config.PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Handle graceful shutdown
 */
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  await DatabaseConfig.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  await DatabaseConfig.disconnect();
  process.exit(0);
});

startServer();