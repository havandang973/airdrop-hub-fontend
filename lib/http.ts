import axios, { InternalAxiosRequestConfig } from 'axios';
import { trimEnd } from 'lodash';
import { appConfig } from '@/config/app';

// Client for calling API
const callApi = axios.create({
  baseURL: trimEnd(appConfig.apiEndpoint, '/') + '/',
  timeout: 15_000,
});

// callApi.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const { initDataRaw, initData } = retrieveLaunchParams();

//     if (initDataRaw) {
//       config.headers['Authorization'] = `tma ${initDataRaw}`;
//     }

//     return config;
//   },
// );

// Client for calling public resources
const callResource = axios.create({
  timeout: 10_000,
});

export { callApi, callResource };
