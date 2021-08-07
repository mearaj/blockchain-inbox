import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';


export const getInboxMessageByIdController: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params['id'];
    const result = await OutboxMessageModel.findById(id);
    if (!result) {
      return res.status(404).send();
    }
    return res.json(result);
  } catch (e) {
    return res.status(500).send();
  }
};
