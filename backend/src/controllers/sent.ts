import {RequestHandler} from 'express';
import {initSDK} from 'db/bluzelleSdk';
import {Account} from 'models/account';
import {SentMessage} from 'models/sent';
import {TextDecoder} from 'util';
import {RenewLeaseReqBody} from 'models/lease';
import {getLeaseFromSeconds} from 'utils/helpers';

export const getSentController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const uuid = `${account.publicKey}:${account.chainName}:sent`;
    const results = await bluzelleSdk.db.q.KeyValues({uuid});
    let sent: SentMessage[] = [];
    await Promise.all(results.keyValues.map(async (eachKeyValue) => {
      const sentMessage = JSON.parse(new TextDecoder().decode(eachKeyValue.value)) as SentMessage;
      const leaseResponse = await bluzelleSdk.db.q.GetLease({key: sentMessage.id, uuid})
      sentMessage.lease = getLeaseFromSeconds(leaseResponse.seconds);
      sent.push(sentMessage)
    }))
    return res.json({sent, pagination: results.pagination});
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};


export const putSentRenewLease: RequestHandler = async (req, res, next) => {
  try {
    const renewLeaseReqBody = req.body as RenewLeaseReqBody;
    const {id, signed, signature, lease} = renewLeaseReqBody;
    if (!renewLeaseReqBody || !id || !signed || !signature || !lease) {
      return res.status(404).send({error: {message: 'Not Found!'}});
    }

    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const uuid = `${account.publicKey}:${account.chainName}:sent`
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

