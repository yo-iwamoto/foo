import axiosModule, { AxiosError, AxiosResponse } from 'axios';
import { FooSignInResource, UserResponse } from '../types';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseURL = isDevelopment
  ? 'http://localhost:5000/api/v1'
  : process.env.NEXT_PUBLIC_FOO_BACK_URL;
const axios = axiosModule.create({ baseURL });

axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('Access-Token');
  config.headers.common['Access-Token'] = accessToken;
  return config;
});

const authGenerator = (method: 'login' | 'signup') => async (resource: FooSignInResource): Promise<UserResponse> => {
  try {
    const isLogin = method === 'login';
    const path = isLogin ? '/sessions' : '/users';
    const res: AxiosResponse<UserResponse> = await axios.post(path, {...resource});
    localStorage.setItem('Access-Token', res.headers['access-token']);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const signIn = {
  signUp: authGenerator('signup'),
  logIn: authGenerator('login')
};