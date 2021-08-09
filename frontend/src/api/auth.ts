import {AxiosRequestConfig} from 'axios';

export const setAuthHeader = (authToken: string, config: AxiosRequestConfig): AxiosRequestConfig => {
  const newConfig = {...config};
  newConfig.headers["Authorization"] = 'Bearer ' + authToken;
  return newConfig;
}
