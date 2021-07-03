import axiosOrig, {AxiosRequestConfig} from 'axios';



const BASE_URL = 'https://localhost:8080/api/v1';
export const REQUEST_LOGIN_TOKEN_ENDPOINT = `/requestLoginToken`;
export const LOGIN_ENDPOINT = `/login`;
export const LOGOUT_ENDPOINT = `/logout`;

const config:AxiosRequestConfig = {
  baseURL: BASE_URL,
}

const axios = axiosOrig.create(config);

export const requestLoginToken = async (address: {publicAddress:string}) => {
  await axios.get(REQUEST_LOGIN_TOKEN_ENDPOINT,{data:address});
}


