import axiosOrig, {AxiosRequestConfig} from 'axios';


const BASE_URL = 'http://localhost:8081/api/v1';
export const TOKEN_ENDPOINT = `/token`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;
export const INBOX_ENDPOINT = `/messages`;
export const SEND_MESSAGES_ENDPOINT = `/messages`;

export interface Message {
  recipientPublicKey: string;
  recipientChainName: string;
  creatorPublicKey: string;
  creatorChainName: string;
  timestamp?:string;
  message: string;
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

export const logout = async (authToken:string):Promise<any> => {
  const newConfig = {...config};
  newConfig.headers["Authorization"] = 'Bearer ' + authToken;
  const axios = axiosOrig.create(config);
  return (await axios.post(LOGOUT_ENDPOINT)).data;
}

export const isLoggedIn = async (authToken:string):Promise<any> => {
  const newConfig = {...config};
  newConfig.headers["Authorization"] = 'Bearer ' + authToken;
  const axios = axiosOrig.create(config);
  return (await axios.get(LOGIN_ENDPOINT)).data;
}


export const sendMessage = async (message: Message) => {
  const axios = axiosOrig.create(config);
  return await axios.post<Message>(SEND_MESSAGES_ENDPOINT, message);
}

const api = {requestLoginToken, login, sendMessage,logout};

export default api;


