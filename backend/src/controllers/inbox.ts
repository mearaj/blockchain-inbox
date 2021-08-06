import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {Account} from 'models/account';
import {initSDK} from 'db/bluzelleSdk';
import {InboxMessage} from 'models/inbox';
import {TextDecoder} from 'util';
import {getLeaseFromSeconds} from 'utils/helpers';


export const getInboxController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const uuid = `${account.publicKey}:${account.chainName}:inbox`;
    const results = await bluzelleSdk.db.q.KeyValues({uuid});
    let inbox: InboxMessage[] = [];
    await Promise.all(results.keyValues.map(async (eachKeyValue) => {
      const inboxMessage:InboxMessage = JSON.parse(new TextDecoder().decode(eachKeyValue.value));
      const leaseResponse = await bluzelleSdk.db.q.GetLease({key:inboxMessage.id, uuid});
      inboxMessage.lease = getLeaseFromSeconds(leaseResponse.seconds);
      inbox.push(inboxMessage)
    }))
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
