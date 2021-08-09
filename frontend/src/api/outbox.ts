import axiosOrig from 'axios';
import {setAuthHeader} from 'api/auth';
import {OutboxMessage} from 'api/interfaces';
import {axiosRequestConfig, OUTBOX_ENDPOINT} from 'api/config';

export const sendMessage = async (authToken: string, message: OutboxMessage) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.post(OUTBOX_ENDPOINT, message);
}
export const getOutbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(OUTBOX_ENDPOINT);
}
export const deleteOutboxMessageById = async (authToken: string, id: string) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.delete(OUTBOX_ENDPOINT, {data: {id}});
}
