import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';


export const getOutboxController: RequestHandler = async (req, res, next) => {
  try {
    const results = await OutboxMessageModel.find();
    return res.json(results);
  } catch (e) {
    return res.status(500).send();
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
    return res.status(500).send();
  }
};


export const saveOutboxMessageController: RequestHandler = async (req, res, next) => {
  const message = new OutboxMessageModel(req.body);
  try {
    const result = await message.save();
    return res.status(201).json({
      id: result.id
    });
  } catch (e) {
    return res.status(400).json({
        error: {
          message: "Please enter a valid request..."
        }
      }
    );
  }
};

