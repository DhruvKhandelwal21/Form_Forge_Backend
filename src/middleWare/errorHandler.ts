import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}


const errorHandler = (e: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(e.statusCode || 500).send({
    status: e.statusCode || 500,
    message: e.message
  });
};
export default {
  errorHandler,
};