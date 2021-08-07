import axiosOrig, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Lease} from '@bluzelle/sdk-js/lib/codec/crud/lease';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';


const BASE_URL = 'http://localhost:8081/api/v1';
export const TOKEN_ENDPOINT = `/token`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/inbox`;
export const OUTBOX_END_POINT = `/outbox`;
export const CLAIM_END_POINT = `/claim`;
export const SENT_END_POINT = `/sent`;
export const SENT_RENEW_LEASE_ENDPOINT = `${SENT_END_POINT}/renew`;
export const INBOX_RENEW_LEASE_ENDPOINT = `${INBOX_ENDPOINT}/renew`;

export interface InboxMessage {
  creatorPublicKey: string,
  creatorChainName: string,
  message: string,
  lease: Lease,
  timestamp: number,
  id: string;
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

export interface ClaimMessage {
  id: string;
  signature: StdSignature | undefined,
  signed: StdSignDoc | undefined,
}

export interface RenewLeaseReqBody {
  id: string;
  lease:Lease;
  signature: StdSignature;
  signed: StdSignDoc;
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

export const login = async (loginRequestBody: LoginRequestBody): Promise<AxiosResponse> => {
  const axios = axiosOrig.create(config);
  return axios.post<AxiosResponse>(LOGIN_ENDPOINT, loginRequestBody);
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
  return await axios.post(OUTBOX_END_POINT, message);
}

const claimMessage = async (authToken: string, message: ClaimMessage) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.post(CLAIM_END_POINT, message);
}


const getOutbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(OUTBOX_END_POINT);
}

const getSent = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(SENT_END_POINT);
}

const getInbox = async (authToken: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(INBOX_ENDPOINT);
}

const deleteOutboxMessageById = async (authToken: string, id: string) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.delete(OUTBOX_END_POINT, {data: {id}});
}

const renewSentMessageLease = async (authToken: string, message: RenewLeaseReqBody) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.put(SENT_RENEW_LEASE_ENDPOINT, message);
}

const renewInboxMessageLease = async (authToken: string, message: RenewLeaseReqBody) => {
  const newConfig = setAuthHeader(authToken, config);
  const axios = axiosOrig.create(newConfig);
  return await axios.put(INBOX_RENEW_LEASE_ENDPOINT, message);
}


export const api = {
  requestLoginToken,
  login,
  getLoginStatus,
  sendMessage,
  getOutbox,
  logout,
  getInbox,
  claimMessage,
  getSent,
  deleteOutboxMessageById,
  renewSentMessageLease,
  renewInboxMessageLease,
};

export default api;


