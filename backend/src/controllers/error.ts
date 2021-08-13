import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express';
import {AppError, ErrorResponseBody} from 'models/error';


export const asyncCatchHandler = (fn: RequestHandler) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res as any, next)).catch(next)

export const errorRequestHandler: ErrorRequestHandler = async (err: AppError, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    const error: ErrorResponseBody = {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ?
            err.stack :
            undefined,
    }
    return res.status(err.statusCode).json(error);
};