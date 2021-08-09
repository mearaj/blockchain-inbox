import axiosOrig, {AxiosResponse} from 'axios';
import {setAuthHeader} from 'api/auth';
import {LoginRequestBody, TokenRequestBody} from 'api/interfaces';
import {axiosRequestConfig, LOGIN_ENDPOINT, TOKEN_ENDPOINT} from 'api/config';

export const requestLoginToken = async (tokenRequestBody: TokenRequestBody): Promise<AxiosResponse> => {
  const axios = axiosOrig.create(axiosRequestConfig);
  return await axios.post<AxiosResponse>(TOKEN_ENDPOINT, tokenRequestBody);
}

export const login = async (loginRequestBody: LoginRequestBody): Promise<AxiosResponse> => {
  const axios = axiosOrig.create(axiosRequestConfig);
  return axios.post<AxiosResponse>(LOGIN_ENDPOINT, loginRequestBody);
}
export const getLoginStatus = async (authToken: string): Promise<AxiosResponse> => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.get(LOGIN_ENDPOINT);
}
