import { axios } from '@/api/lib/axios';
import { AxiosResponse } from 'axios';
import { FooSignInResource, UpdateNameResource, UserResponse } from '@/types';

export class UsersController {
  static signUp = async (resource: FooSignInResource): Promise<UserResponse> => {
    try {
      const res = await axios.post('/users', resource);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static logIn = async (resource: FooSignInResource): Promise<UserResponse> => {
    try {
      const res = await axios.post('/sessions', resource);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static autoLogIn = async (): Promise<UserResponse> => {
    try {
      const res: AxiosResponse<UserResponse> = await axios.post('/sessions');
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static updateName = async (resource: UpdateNameResource): Promise<UserResponse> => {
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
}
