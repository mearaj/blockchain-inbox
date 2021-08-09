import {RequestHandler} from 'express';
import {Account} from 'models/account';
import {initSDK} from 'db/bluzelleSdk';
import {INBOX_ENDPOINT, SENT_ENDPOINT} from 'config';
import {DeleteMessageReqBody, Message} from 'models/message';
import {TextDecoder} from 'util';
import {getLeaseFromSeconds} from 'utils/helpers';

export const getMessagesController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    let uuid = "";
    switch (req.url) {
      case SENT_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:sent`;
        break;
      case INBOX_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:inbox`;
        break;
    }
    const results = await bluzelleSdk.db.q.KeyValues({uuid});
    let messages: Message[] = [];
    await Promise.all(results.keyValues.map(async (eachKeyValue) => {
      const message = JSON.parse(new TextDecoder().decode(eachKeyValue.value)) as Message;
      const leaseResponse = await bluzelleSdk.db.q.GetLease({key: message.id, uuid})
      message.lease = getLeaseFromSeconds(leaseResponse.seconds);
      messages.push(message)
    }))
    switch (req.url) {
      case SENT_ENDPOINT:
        return res.json({sent: messages, pagination: results.pagination, timestamp: Date.now().valueOf()});
      case INBOX_ENDPOINT:
        return res.json({inbox: messages, pagination: results.pagination, timestamp: Date.now().valueOf()});
    }
    return res.status(404).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

export const deleteMessageController: RequestHandler = async (req, res, next) => {
  try {
    const messageReqBody = req.body as DeleteMessageReqBody;
    const {id, signed, signature} = messageReqBody;
    if (!messageReqBody || !id || !signed || !signature) {
      return res.status(404).send({error: {message: 'Not Found!'}});
    }

    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    let uuid = "";
    switch (req.url) {
      case SENT_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:sent`;
        break;
      case INBOX_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:inbox`;
        break;
    }

    const message = await bluzelleSdk.db.q.Has({key: id, uuid});
    if (message.has) {
      //await bluzelleSdk.db.tx.RenewLease({creator: bluzelleSdk.db.address, key: id, uuid, lease})
      await bluzelleSdk.db.tx.Delete({creator: bluzelleSdk.db.address, key: id, uuid})
      return res.status(201).send();
    }
    return res.status(404).send();

  } catch (e) {
    console.log(e);
    return res.status(500).send({error: {message: 'Something went wrong!'}});
  }
};
