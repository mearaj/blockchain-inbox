import {RequestHandler} from 'express';
import {initSDK} from 'db/bluzelleSdk';
import {Account} from 'models/account';
import {SentMessage} from 'models/sent';
import {TextDecoder} from 'util';
import {InboxMessage} from 'models/inbox';
import {RenewLeaseReqBody} from 'models/lease';

export const getSentController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const results = await bluzelleSdk.db.q.KeyValues({uuid: `${account.publicKey}:${account.chainName}:sent`});
    let sent: SentMessage[] = [];
    results.keyValues.map((eachKeyValue) => {
      const sentMessage = JSON.parse(new TextDecoder().decode(eachKeyValue.value));
      sent.push(sentMessage)
    })
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
      await bluzelleSdk.db.tx.RenewLease({creator: bluzelleSdk.db.address, key: id, uuid,lease})
      return res.status(201).send();
    }
    return res.status(404).send();

  } catch (e) {
      console.log(e);
      return res.status(500).send({error:{message:'Something went wrong!'}});
  }
};

