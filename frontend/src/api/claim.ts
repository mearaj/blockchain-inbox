import {setAuthHeader} from 'api/auth';
import axiosOrig from 'axios';
import {ClaimMessage} from 'api/interfaces';
import {axiosRequestConfig, CLAIM_ENDPOINT} from 'api/config';

export const claimMessage = async (authToken: string, message: ClaimMessage) => {
  const newConfig = setAuthHeader(authToken, axiosRequestConfig);
  const axios = axiosOrig.create(newConfig);
  return await axios.post(CLAIM_ENDPOINT, message);
}
