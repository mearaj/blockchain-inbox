import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';

export interface TokenRequestBody {
  publicKey: string;
  chainName: string;
}

export interface TokenResponseBody {
  token: string;
}

export interface LoginResponseBody {
  auth: string;
}

export interface ClaimMessage {
  id: string;
  signature: StdSignature | undefined,
  signed: StdSignDoc | undefined,
}

export interface RenewLeaseReqBody {
  id: string;
  lease: Lease;
  signature: StdSignature;
  signed: StdSignDoc;
}

export interface DeleteMessageReqBody {
  id: string;
  signature: StdSignature | undefined,
  signed: StdSignDoc | undefined,
}

export interface LoginRequestBody extends TokenRequestBody {
  signature: string;
  token: string;
}

export interface SentMessage {
  recipientPublicKey: string,
  recipientChainName: string,
  message: string,
  lease: Lease,
  timestamp: number,
  id: string;
}

export interface OutboxMessage {
  creatorPublicKey: string;
  creatorChainName: string;
  creatorEncryptedMessage: string,
  recipientPublicKey: string;
  recipientChainName: string;
  recipientEncryptedMessage: string,
  lease: Lease;
  message?: string;
  timestamp?: number;
  id?: string;
}
