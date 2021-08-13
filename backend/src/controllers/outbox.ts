import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {Account} from 'models/account';
import {v4 as uuid} from 'uuid';
import {AppError} from "../models/error";


export const getOutboxController: RequestHandler = async (req, res, next) => {
    try {
        const account = (req as any).account as Account;
        const results = await OutboxMessageModel.find({
            creatorPublicKey: account.publicKey,
            creatorChainName: account.chainName
        });
        return res.json(results);
    } catch (e) {
        return next(e);
    }
};

// Note: This controller assumes authGuard is called before it.
export const deleteOutboxMessageById: RequestHandler = async (req, res, next) => {
    try {
        const id = req.body.id;
        if (!id) {
            const error = new AppError('Bad Request', 400);
            return next(error);
        }
        await OutboxMessageModel.deleteOne({id});
        return res.status(200).send();
    } catch (e) {
        console.log(e);
        return next(new AppError());
    }
};


export const getOutboxMessageByIdController: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params['id'];
        const result = await OutboxMessageModel.findById(id);
        if (!result) {
            return res.status(404).send();
        }
        return res.json(result);
    } catch (e) {
        return next(new AppError());
    }
};


export const saveOutboxMessageController: RequestHandler = async (req, res, next) => {
    const message = new OutboxMessageModel(req.body);
    message.id = uuid();
    message.timestamp = Date.now().valueOf();
    const {seconds, minutes, hours, days, years} = message.lease;
    if (!seconds && !minutes && !hours && !days && !years) {
        return next(new AppError("Lease Cannot Be 0 Or Empty!", 400));
    }

    try {
        const result = await message.save();
        return res.status(201).json({id: result.id});
    } catch (e) {
        console.log(e);
        return next(new AppError());
    }
};

