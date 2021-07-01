import axiosOrig, {AxiosRequestConfig} from 'axios';
import {Dispatch} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';


const baseUrl = 'https://localhost:8080';
const endpoint = `${baseUrl}/api/v1`;
const registerUrl = `${endpoint}/register`

const config:AxiosRequestConfig = {
  baseURL: 'https://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
}

const axios = axiosOrig.create(config);

const registerUser = (dispatch:Dispatch<PayloadAction>) => {
  return axios.post("")
};

