import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {Account} from 'models/account';
import {initSDK} from 'db/bluzelleSdk';
import {InboxMessage} from 'models/inbox';


export const getInboxController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const results = await bluzelleSdk.db.q.KeyValues({uuid: `${account.publicKey}:${account.chainName}:inbox`});
    let inbox: InboxMessage[] = [];
    results.keyValues.map((eachKeyValue) => {
      const inboxMessage:InboxMessage = JSON.parse(new TextDecoder().decode(eachKeyValue.value));
      inbox.push(inboxMessage)
    })
    return res.json({inbox, pagination: results.pagination});
  } catch (e) {
    console.log(e);
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
