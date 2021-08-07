import {RequestHandler} from 'express';
import {Account} from 'models/account';
import {initSDK} from 'db/bluzelleSdk';
import {INBOX_ENDPOINT, INBOX_RENEW_LEASE_ENDPOINT, SENT_ENDPOINT, SENT_RENEW_LEASE_ENDPOINT} from 'config';
import {Message} from 'models/message';
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
