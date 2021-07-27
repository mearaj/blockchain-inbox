import {StdSignature, StdSignDoc} from '@cosmjs/amino'

export interface ClaimMessage {
  id: string;
  signature: StdSignature,
  signed: StdSignDoc,
}

