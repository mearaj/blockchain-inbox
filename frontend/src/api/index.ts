import axiosOrig, {AxiosRequestConfig} from 'axios';


const BASE_URL = 'http://localhost:8081/api/v1';
export const REQUEST_LOGIN_TOKEN_ENDPOINT = `/requestLoginToken`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/messages`;
export const SEND_MESSAGES_ENDPOINT = `/messages`;

export interface Message {
  to:string;
  from:string;
  message:string;
}

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const requestLoginToken = async (address: { publicAddress: string }) => {
  const axios = axiosOrig.create(config);
  return await axios.post<{ publicAddress: string, loginToken: string }>(REQUEST_LOGIN_TOKEN_ENDPOINT, address);
}

export const login = async (address: { publicAddress: string }) => {
  const axios = axiosOrig.create(config);
  return await axios.post<{ publicAddress: string, loginToken: string }>(REQUEST_LOGIN_TOKEN_ENDPOINT, address);
}

export const sendMessage = async (message:Message) => {
  const axios = axiosOrig.create(config);
  return await axios.post<Message>(SEND_MESSAGES_ENDPOINT, message);
}

const api = {requestLoginToken, login, sendMessage};

export default api;


