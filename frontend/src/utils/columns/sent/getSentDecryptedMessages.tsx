import {getDecryptedMessageFromPrivateKey} from 'chains';
import {SentMessage} from 'api';
import {Account} from 'store';

export const getSentDecryptedMessages = async (sent: SentMessage[], currentAccount: Account): Promise<SentMessage[]> => {
  return await Promise.all(sent.map(async (eachSent) => {
      try {
        const eachMessageObject = await getDecryptedMessageFromPrivateKey(
          currentAccount!.privateKey,
          currentAccount!.chainName,
          eachSent.message,
        );
        return {
          ...eachSent,
          message: eachMessageObject.decryptedMessage,
        }
      } catch (e) {
        console.log(e);
        return eachSent
      }
    })
  );
}

export default getSentDecryptedMessages;
