import { z } from 'zod';

/**
 * Zod schema for validating SenyoQuote input data
 */
export const createSenyoQuoteSchema = z.object({
  quote: z.string().min(1, 'Quote cannot be empty').trim(),
});

/**
 * Zod schema for complete SenyoQuote object including database fields
 */
export const senyoQuoteSchema = z.object({
  id: z.string(),
  quote: z.string(),
  timestamp: z.date(),
});

/**
 * TypeScript type for SenyoQuote inferred from Zod schema
 */
export type SenyoQuote = z.infer<typeof senyoQuoteSchema>;

/**
 * TypeScript type for creating a new SenyoQuote
 */
export type CreateSenyoQuote = z.infer<typeof createSenyoQuoteSchema>;