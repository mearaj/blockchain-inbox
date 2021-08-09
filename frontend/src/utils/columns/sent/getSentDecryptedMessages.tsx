import {getDecryptedMessageFromPrivateKey} from 'chains';
import {Account} from 'store';
import {SentMessage} from 'api/interfaces';

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
