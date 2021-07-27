import {RequestHandler} from 'express';
import {initSDK} from 'db/bluzelleSdk';
import {Account} from 'models/account';
import {SentMessage} from 'models/sent';

export const getSentController: RequestHandler = async (req, res, next) => {
  try {
    const account = (req as any).account as Account;
    const bluzelleSdk = await initSDK();
    const results = await bluzelleSdk.db.q.KeyValues({uuid: `${account.publicKey}:${account.chainName}:sent`});
    let sent:SentMessage[] = [];
    results.keyValues.map((eachKeyValue)=> {
      const sentMessage = JSON.parse(new TextDecoder().decode(eachKeyValue.value));
      sent.push(sentMessage)
    })
    return res.json({sent, pagination:results.pagination});
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};
