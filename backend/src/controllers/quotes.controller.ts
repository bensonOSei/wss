import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { isEmpty } from 'lodash';
import { SenyoQuoteModel } from '../models/senyo-quote.model';
import { createSenyoQuoteSchema } from '../schemas/senyo-quote.schema';
import { AppError } from '../middleware/error-handler';

/**
 * Controller for handling quotes-related operations
 */
class QuotesController {
  /**
   * Retrieves all quotes from the database
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  public async getAllQuotes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const quotes = await SenyoQuoteModel.find()
        .sort({ timestamp: -1 })
        .lean()
        .exec();

      if (isEmpty(quotes)) {
        res.status(200).json([]);
        return;
      }

      const formattedQuotes = quotes.map(quote => ({
        id: quote._id.toString(),
        quote: quote.quote,
        timestamp: quote.timestamp,
      }));

      res.status(200).json(formattedQuotes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Creates a new quote in the database
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  public async createQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validationResult = createSenyoQuoteSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map((err: any) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        throw new AppError(errorMessage, 400);
      }

      const { quote } = validationResult.data;

      const newQuote = new SenyoQuoteModel({
        id: new Types.ObjectId().toString(),
        quote,
        timestamp: new Date(),
      });

      const savedQuote = await newQuote.save();

      const formattedQuote = {
        id: (savedQuote._id as any).toString(),
        quote: savedQuote.quote,
        timestamp: savedQuote.timestamp,
      };

      res.status(201).json(formattedQuote);
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Exported instance of QuotesController
 */
export const quotesController = new QuotesController();