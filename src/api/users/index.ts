import { axios } from '@/api/lib/axios';
import { AxiosResponse } from 'axios';
import { FooSignInResource, UpdateNameResource, UserResponse } from '@/types';

const authGenerator =
  (method: 'login' | 'signup') =>
  async (resource: FooSignInResource): Promise<UserResponse> => {
    try {
      const isLogin = method === 'login';
      const path = isLogin ? '/sessions' : '/users';
      const res: AxiosResponse<UserResponse> = await axios.post(path, resource);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

const signUp = authGenerator('signup');
const logIn = authGenerator('login');

const autoLogIn = async (): Promise<UserResponse> => {
  try {
    const res: AxiosResponse<UserResponse> = await axios.post('/sessions');
    return res.data;
  } catch (err) {
    throw err;
  }
};

const updateName = async (resource: UpdateNameResource): Promise<UserResponse> => {
  try {
    const params = {
      name: resource.name,
    };
    const res: AxiosResponse<UserResponse> = await axios.patch(`/users/${resource.uid}`, params);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const usersController = {
  signUp,
  logIn,
  autoLogIn,
  updateName,
};
