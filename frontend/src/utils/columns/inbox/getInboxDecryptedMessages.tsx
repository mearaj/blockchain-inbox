import {getDecryptedMessageFromPrivateKey} from 'chains';
import {InboxMessage} from 'api';
import {Account} from 'store';

export const getInboxDecryptedMessages = async (inbox: InboxMessage[], currentAccount: Account): Promise<InboxMessage[]> => {
  return await Promise.all(inbox.map(async (eachInbox) => {
      try {
        const eachMessageObject = await getDecryptedMessageFromPrivateKey(
          currentAccount!.privateKey,
          currentAccount!.chainName,
          eachInbox.message,
        );
        return {
          ...eachInbox,
          message: eachMessageObject.decryptedMessage,
        }
      } catch (e) {
        console.log(e);
        return eachInbox
      }
    })
  );
}

