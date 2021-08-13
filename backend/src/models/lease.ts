import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {StdSignature, StdSignDoc} from '@cosmjs/amino';

export interface RenewLeaseReqBody {
    id: string;
    lease: Lease;
    signature: StdSignature;
    signed: StdSignDoc;
}
