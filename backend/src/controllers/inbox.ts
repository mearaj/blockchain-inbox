import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {AppError as AppError} from "../models/error";
import {asyncCatchHandler} from "./error";


export const getInboxMessageByIdController: RequestHandler = asyncCatchHandler(async (req, res, next) => {
    const id = req.params['id'];
    const result = await OutboxMessageModel.findById(id);
    if (!result) {
        return next(new AppError("Message Not Found!", 404));
    }
    return res.json(result);
});
