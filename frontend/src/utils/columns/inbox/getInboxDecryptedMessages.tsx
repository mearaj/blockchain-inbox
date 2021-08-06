import {getDecryptedMessageFromPrivateKey} from 'chains';
import {InboxMessage} from 'api';
import {Account} from 'store';
import {getExpiryFromLease} from 'utils/helpers/getExpiryFromLease';

export const getInboxDecryptedMessages = async (inbox: InboxMessage[], currentAccount: Account): Promise<InboxMessage[]> => {
  return await Promise.all(inbox.map(async (eachInbox) => {
      try {
        const eachMessageObject = await getDecryptedMessageFromPrivateKey(
          currentAccount!.privateKey,
          currentAccount!.chainName,
          eachInbox.message,
        );
        const expiresAfter = getExpiryFromLease(eachInbox.lease);
        return {
          ...eachInbox,
          expiresAfter,
          message: eachMessageObject.decryptedMessage,
        }
      } catch (e) {
        const expiresAfter = getExpiryFromLease(eachInbox.lease);
        console.log(e);
        return {
          ...eachInbox,
          expiresAfter,
        }
      }
    })
  );
}

