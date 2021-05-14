import axiosModule, { AxiosError, AxiosResponse } from 'axios';
import { FooLogInResource, FooSignUpResource, UserResponse } from '../types';

// const axios = axiosModule.create({ baseURL: 'https://foo-back.herokuapp.com/api/v1' });
const axios = axiosModule.create({ baseURL: 'http://localhost:5000/api/v1' });

axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('Access-Token');
  config.headers.common['Access-Token'] = accessToken;
  return config;
});

export const signUp = async (resource: FooSignUpResource): Promise<UserResponse> => {
  let result: UserResponse;
  await axios.post('/users', {...resource})
    .then((res: AxiosResponse<UserResponse>): void => {
      localStorage.setItem('Access-Token', res.headers['access-token']);
      result = res.data;
    })
    .catch((err): void => {
      throw err;
    })
  return result;
};

export const logIn = async (resource: FooLogInResource): Promise<UserResponse> => {
  let result: UserResponse;
  await axios.post('/sessions', { uid: resource.uid })
    .then((res: AxiosResponse<UserResponse>): void => {
      localStorage.setItem('Access-Token', res.headers['access-token']);
      result = res.data;
    })
    .catch((err): void => {
      throw err;
    })
  return result;
};