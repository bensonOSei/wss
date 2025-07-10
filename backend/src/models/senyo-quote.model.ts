import { Schema, model, Document } from 'mongoose';
import type { SenyoQuote } from '../schemas/senyo-quote.schema';

/**
 * Mongoose document interface for SenyoQuote
 */
export interface SenyoQuoteDocument extends Document {
  id: string;
  quote: string;
  timestamp: Date;
}

/**
 * Mongoose schema for SenyoQuote collection
 */
const senyoQuoteSchema = new Schema<SenyoQuoteDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

/**
 * Index for efficient querying by timestamp
 */
senyoQuoteSchema.index({ timestamp: -1 });

/**
 * Transform function to match the expected SenyoQuote interface
 */
senyoQuoteSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = (ret._id as any).toString();
    delete ret._id;
    return ret;
  },
});

/**
 * Mongoose model for SenyoQuote
 */
export const SenyoQuoteModel = model<SenyoQuoteDocument>('SenyoQuote', senyoQuoteSchema);