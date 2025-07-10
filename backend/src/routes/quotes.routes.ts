import { Router } from 'express';
import { quotesController } from '../controllers/quotes.controller';

/**
 * Express router for quotes endpoints
 */
export const quotesRouter = Router();

/**
 * GET /api/quotes - Retrieve all quotes
 * Returns quotes sorted by timestamp in descending order (newest first)
 */
quotesRouter.get('/quotes', quotesController.getAllQuotes);

/**
 * POST /api/quotes - Create a new quote
 * Validates input using Zod schema before saving
 */
quotesRouter.post('/quotes', quotesController.createQuote);