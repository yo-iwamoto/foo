import { axios } from '@/api/axios';
import { AxiosResponse } from 'axios';
import { FooSignInResource, UpdateNameResource, FooUser } from '@/types';

const authGenerator =
  (method: 'login' | 'signup') =>
  async (resource: FooSignInResource): Promise<FooUser> => {
    try {
      const isLogin = method === 'login';
      const path = isLogin ? '/sessions' : '/users';
      const res: AxiosResponse<FooUser> = await axios.post(path, resource);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

export const signIn = {
  signUp: authGenerator('signup'),
  logIn: authGenerator('login'),
};

export const autoLogIn = async (): Promise<FooUser> => {
  try {
    const res: AxiosResponse<FooUser> = await axios.post('/sessions');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateName = async (
  resource: UpdateNameResource,
): Promise<FooUser> => {
  try {
    const params = {
      name: resource.name,
    };
    const res: AxiosResponse<FooUser> = await axios.patch(
      `/users/${resource.uid}`,
      params,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
