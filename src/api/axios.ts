import axiosModule from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment
  ? 'http://localhost:5000/api/v1'
  : process.env.NEXT_PUBLIC_FOO_BACK_URL;

export const axios = axiosModule.create({ baseURL });

axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('Access-Token');
  if (accessToken) {
    config.headers.common['Access-Token'] = accessToken;
  }
  return config;
});
