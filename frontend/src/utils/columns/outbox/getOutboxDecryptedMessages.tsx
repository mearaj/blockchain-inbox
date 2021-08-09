import {getDecryptedMessageFromPrivateKey} from 'chains';
import {Account} from 'store';
import {OutboxMessage} from 'api/interfaces';

export const getOutboxDecryptedMessages = async (outbox: OutboxMessage[], currentAccount: Account): Promise<OutboxMessage[]> => {
  return await Promise.all(outbox.map(async (eachOutbox) => {
      try {
        const eachMessageObject = await getDecryptedMessageFromPrivateKey(
          currentAccount!.privateKey,
          currentAccount!.chainName,
          eachOutbox.creatorEncryptedMessage,
        );
        return {
          ...eachOutbox,
          message: eachMessageObject.decryptedMessage,
        }
      } catch (e) {
        console.log(e);
        return eachOutbox
      }
    })
  );
}

