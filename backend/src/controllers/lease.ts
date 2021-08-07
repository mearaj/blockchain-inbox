import {RequestHandler} from 'express';
import {RenewLeaseReqBody} from 'models/lease';
import {Account} from 'models/account';
import {initSDK} from 'db/bluzelleSdk';
import {INBOX_RENEW_LEASE_ENDPOINT, SENT_RENEW_LEASE_ENDPOINT} from 'config';

export const putRenewLeaseController: RequestHandler = async (req, res, next) => {
  try {
    const renewLeaseReqBody = req.body as RenewLeaseReqBody;
    const {id, signed, signature, lease} = renewLeaseReqBody;
    if (!renewLeaseReqBody || !id || !signed || !signature || !lease) {
      return res.status(404).send({error: {message: 'Not Found!'}});
    }

    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    let uuid = "";
    switch (req.url) {
      case SENT_RENEW_LEASE_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:sent`;
        break;
      case INBOX_RENEW_LEASE_ENDPOINT:
        uuid = `${account.publicKey}:${account.chainName}:inbox`;
        break;
    }

    const message = await bluzelleSdk.db.q.Has({key: id, uuid});
    if (message.has) {
      await bluzelleSdk.db.tx.RenewLease({creator: bluzelleSdk.db.address, key: id, uuid, lease})
      return res.status(201).send();
    }
    return res.status(404).send();

  } catch (e) {
    console.log(e);
    return res.status(500).send({error: {message: 'Something went wrong!'}});
  }
};
