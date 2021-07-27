import {StdSignature, StdSignDoc} from '@cosmjs/amino'

export interface ClaimMessage {
  uuid: string;
  signature: StdSignature,
  signed: StdSignDoc,
}

