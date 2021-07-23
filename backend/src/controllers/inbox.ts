import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {Account} from 'models/account';


export const getInboxController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const results = await OutboxMessageModel.find({
      recipientPublicKey: account.publicKey,
      recipientChainName: account.chainName
    });
    return res.json(results);
  } catch (e) {
    return res.status(500).send();
  }
};

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
