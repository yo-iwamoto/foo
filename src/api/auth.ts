import axiosModule from 'axios';
import { RegisterPayload } from '../types';

const axios = axiosModule.create({
  baseURL: 'https://foo-back.herokuapp.com/'
});

axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('Access-Token');
  config.headers.common['Access-Token'] = accessToken;
  return config;
});

export const register = async (payload: RegisterPayload): Promise<void> => {
  
}