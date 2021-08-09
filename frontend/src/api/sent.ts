import {setAuthHeader} from 'api/auth';
import axiosOrig from 'axios';
import {DeleteMessageReqBody, RenewLeaseReqBody} from 'api/interfaces';
import {axiosRequestConfig, SENT_ENDPOINT, SENT_RENEW_LEASE_ENDPOINT} from 'api/config';

export const getSent = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(SENT_ENDPOINT);
}
export const renewSentMessageLease = async (authToken: string, message: RenewLeaseReqBody) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.put(SENT_RENEW_LEASE_ENDPOINT, message);
}
export const deleteSentMessage = async (authToken: string, message: DeleteMessageReqBody) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.delete(SENT_ENDPOINT, {data: message});
}

