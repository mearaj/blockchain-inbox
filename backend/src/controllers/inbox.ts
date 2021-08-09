import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {Error} from 'mongoose';


export const getInboxMessageByIdController: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params['id'];
    const result = await OutboxMessageModel.findById(id);
    if (!result) {
      const error = new Error("Message Not Found!");
      res.status(404)
      next(error);
    }
    return res.json(result);
  } catch (e) {
    return res.status(500).send();
  }
};
