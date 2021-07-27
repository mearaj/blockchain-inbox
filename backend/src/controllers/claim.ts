import {RequestHandler} from 'express';
import {OutboxMessageModel} from 'models/outbox';
import {ClaimMessage} from 'models/claim';
import {initSDK} from 'db/bluzelleSdk';
import {SentMessage} from 'models/sent';
import {InboxMessage} from 'models/inbox';

export const getClaimController: RequestHandler = async (req, res, next) => {
  try {
    const claimMessage = req.body as ClaimMessage;
    if (!claimMessage || !claimMessage.uuid || !claimMessage.signed || !claimMessage.signature) {
      return res.status(404).send();
    }
    const message = await OutboxMessageModel.findOne({uuid: claimMessage.uuid});
    if (!message) {
      console.log(claimMessage)
      console.log("Not found!")
      return res.status(404).send();
    }
    const bluzelleSDK = await initSDK();
    const sentMessage: SentMessage = {
      lease: message.lease,
      recipientPublicKey: message.recipientPublicKey,
      recipientChainName: message.recipientChainName,
      message: message.creatorEncryptedMessage,
      timestamp: message.timestamp,
      uuid: message.uuid,
    };
    const inboxMessage: InboxMessage = {
      lease: message.lease,
      creatorPublicKey: message.creatorPublicKey,
      creatorChainName: message.creatorChainName,
      message: message.recipientEncryptedMessage,
      timestamp: message.timestamp,
      uuid: message.uuid,
    };
    await bluzelleSDK.db.withTransaction(async () => {

      // for sender
      await bluzelleSDK.db.tx.Create({
        creator: bluzelleSDK.db.address,
        uuid: `${message.creatorPublicKey}:${message.creatorChainName}:sent`,
        key: message.uuid,
        value: new TextEncoder().encode(JSON.stringify(sentMessage)),
        metadata: new Uint8Array(0),
        lease: message.lease,
      });
      // for receiver
      await bluzelleSDK.db.tx.Create({
        creator: bluzelleSDK.db.address,
        uuid: `${message.recipientPublicKey}:${message.recipientChainName}:inbox`,
        key: message.uuid,
        value: new TextEncoder().encode(JSON.stringify(inboxMessage)),
        metadata: new Uint8Array(0),
        lease: message.lease,
      });
      try {
        const deleted = await OutboxMessageModel.deleteOne({uuid: message.uuid});
        console.log(deleted);
      } catch (e) {
        console.log(e);
      }
      return res.status(201).send();
    }, {memo: ''})
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};
