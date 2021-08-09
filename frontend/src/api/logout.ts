import axiosOrig, {AxiosResponse} from 'axios';
import {setAuthHeader} from 'api/auth';
import {axiosRequestConfig, LOGOUT_ENDPOINT} from 'api/config';

export const logout = async (authToken: string): Promise<AxiosResponse> => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.post(LOGOUT_ENDPOINT);
}
