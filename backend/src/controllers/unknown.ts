import {RequestHandler} from "express";
import {AppError} from "../models/error";

export const unknownRouteRequestHandler: RequestHandler = async (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};