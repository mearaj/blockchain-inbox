import {AxiosRequestConfig} from 'axios';
import {BASE_URL} from 'config';

export const TOKEN_ENDPOINT = `/token`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/inbox`;
export const OUTBOX_ENDPOINT = `/outbox`;
export const CLAIM_ENDPOINT = `/claim`;
export const SENT_ENDPOINT = `/sent`;
export const SENT_RENEW_LEASE_ENDPOINT = `${SENT_ENDPOINT}/renew`;
export const INBOX_RENEW_LEASE_ENDPOINT = `${INBOX_ENDPOINT}/renew`;

export const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}
