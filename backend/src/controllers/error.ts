import {ErrorRequestHandler} from 'express';
import {ErrorResponseBody} from 'models/error';

export const errorRequestHandler: ErrorRequestHandler = async (err, req, res, next) => {
  const statusCode = res.statusCode===200 ? 500:res.statusCode;
  res.status(statusCode);
  const error: ErrorResponseBody = {
    error: {
      message: err.message,
      stack: process.env.NODE_ENV==='development' ?
        err.stack:
        null
    }
  };
  return res.json(error);
};

