import axiosOrig, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';


const BASE_URL = 'http://localhost:8081/api/v1';
export const TOKEN_ENDPOINT = `/token`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/inbox`;
export const OUTBOX_END_POINT = `/outbox`;
export const SENT_END_POINT = `/sent`;


export interface InboxMessage {
  recipientEncryptedMessage: string,
  creatorPublicKey: string;
  creatorChainName: string;
  lease: Lease;
  message?:string;
  timestamp?: string;
  uuid?: string;
}

export interface OutboxMessage extends InboxMessage {
  recipientPublicKey: string;
  recipientChainName: string;
  creatorEncryptedMessage: string,
}

export interface TokenRequestBody {
  publicKey: string;
  chainName: string;
}

export interface TokenResponseBody {
  token: string;
}

export interface LoginRequestBody extends TokenRequestBody {
  signature: string;
  token: string;
}

export interface LoginResponseBody {
  auth: string;
}

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const requestLoginToken = async (tokenRequestBody: TokenRequestBody): Promise<AxiosResponse> => {
  const axios = axiosOrig.create(config);
  return await axios.post<AxiosResponse>(TOKEN_ENDPOINT, tokenRequestBody);
}

export const login = async (loginRequestBody: LoginRequestBody): Promise<LoginResponseBody> => {
  const axios = axiosOrig.create(config);
  return (await axios.post<LoginResponseBody>(LOGIN_ENDPOINT, loginRequestBody)).data;
}

export const setAuthHeader = (authToken: string, config: AxiosRequestConfig): AxiosRequestConfig => {
  const newConfig = {...config};
  newConfig.headers["Authorization"] = 'Bearer ' + authToken;
  return newConfig;
}

export const logout = async (authToken: string): Promise<AxiosResponse> => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.post(LOGOUT_ENDPOINT);
}

const getLoginStatus = async (authToken: string): Promise<AxiosResponse> => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(LOGIN_ENDPOINT);
}


const sendMessage = async (authToken: string, message: OutboxMessage) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.post<OutboxMessage>(OUTBOX_END_POINT, message);
}

const getOutbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(OUTBOX_END_POINT);
}

const getInbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(INBOX_ENDPOINT);
}

export const api = {requestLoginToken, login, getLoginStatus, sendMessage, getOutbox, logout, getInbox};

export default api;


