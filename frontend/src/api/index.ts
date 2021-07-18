import axiosOrig, {AxiosRequestConfig} from 'axios';


const BASE_URL = 'http://localhost:8081/api/v1';
export const TOKEN_ENDPOINT = `/token`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/messages`;
export const SEND_MESSAGES_ENDPOINT = `/messages`;

export interface Message {
  to: string;
  from: string;
  message: string;
}

export interface TokenRequestBody {
  publicKey: string;
  chainName: string;
}

export interface TokenResponseBody {
  token: string;
}
export interface LoginRequestBody extends TokenRequestBody {
  signature:string;
  token:string;
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

export const requestLoginToken = async (tokenRequestBody: TokenRequestBody): Promise<TokenResponseBody> => {
  const axios = axiosOrig.create(config);
  return (await axios.post<TokenResponseBody>(TOKEN_ENDPOINT, tokenRequestBody)).data;
}

export const login = async (loginRequestBody:LoginRequestBody):Promise<LoginResponseBody> => {
  const axios = axiosOrig.create(config);
  return (await axios.post<LoginResponseBody>(LOGIN_ENDPOINT, loginRequestBody)).data;
}

export const sendMessage = async (message: Message) => {
  const axios = axiosOrig.create(config);
  return await axios.post<Message>(SEND_MESSAGES_ENDPOINT, message);
}

const api = {requestLoginToken, login, sendMessage};

export default api;


