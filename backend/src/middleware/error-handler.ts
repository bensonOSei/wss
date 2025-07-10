import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error response interface
 */
interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

/**
 * Global error handling middleware
 * @param error - The error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    message = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
  }

  // Handle custom application errors
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  // Handle MongoDB duplicate key errors
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry found';
  }

  // Handle MongoDB validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values((error as any).errors).map((err: any) => err.message).join(', ');
  }

  // Handle MongoDB cast errors
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }

  // Log error for debugging
  console.error('❌ Error occurred:', {
    message: error.message,
    stack: error.stack,
    statusCode,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const errorResponse: ErrorResponse = {
    error: error.name || 'Error',
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
};