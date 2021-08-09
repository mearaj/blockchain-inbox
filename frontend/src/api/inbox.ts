import {setAuthHeader} from 'api/auth';
import axiosOrig from 'axios';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {DeleteMessageReqBody, RenewLeaseReqBody} from 'api/interfaces';
import {axiosRequestConfig, INBOX_ENDPOINT, INBOX_RENEW_LEASE_ENDPOINT} from 'api/config';

export const getInbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(INBOX_ENDPOINT);
}
export const renewInboxMessageLease = async (authToken: string, message: RenewLeaseReqBody) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.put(INBOX_RENEW_LEASE_ENDPOINT, message);
}
export const deleteInboxMessage = async (authToken: string, message: DeleteMessageReqBody) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.delete(INBOX_ENDPOINT, {data: message});
}

export interface InboxMessage {
  creatorPublicKey: string,
  creatorChainName: string,
  message: string,
  lease: Lease,
  timestamp: number,
  id: string;
}
