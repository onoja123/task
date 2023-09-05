import { AxiosError} from 'axios';
import AppError from './appError';
import { Response } from 'express';

export const handleRateLimitError = (error: AxiosError, res: Response) => {
  if (error.response?.status === 429) {
    res.status(429).json({
      status: 'error',
      message: 'Rate limit exceeded',
    });
    throw new AppError('Rate limit exceeded. Please try again later.', 429);
  }
  throw error;
};
