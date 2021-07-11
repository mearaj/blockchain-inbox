import {request, RequestHandler, Router} from 'express';
import {OUTBOX_ENDPOINT} from 'config';
import {OutboxMessageModel} from 'models/outbox';

const router = Router();


export const getOutboxController:RequestHandler = async (req, res, next) => {
  try {
    const results = await OutboxMessageModel.find();
    console.log(results);
    return res.json(results);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export const getOutboxMessageByIdController:RequestHandler = async (req, res, next) => {
  try {
    const id = req.params['id'];
    console.log(id);
    const result = await OutboxMessageModel.findById(id);
    if (!result) {
      return res.status(404).send();
    }
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};


export const saveOutboxMessageController:RequestHandler = async (req, res, next) => {
  const message = new OutboxMessageModel(req.body);
  try {
    const result = await message.save();
    console.log(result);
    return res.status(201).json({
      id: result.id
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
        error: {
          message: "Please enter a valid request..."
        }
      }
    );
  }
};

