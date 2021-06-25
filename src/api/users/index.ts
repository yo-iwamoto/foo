import { axios } from '@/api/lib/axios';
import { AxiosResponse } from 'axios';
import { FooSignInResource, UpdateNameResource, UserResponse } from '@/types';
import { FooEndPoint } from '../lib/url';

export class UsersController {
  static signUp = async (resource: FooSignInResource): Promise<UserResponse> => {
    const endPoint = new FooEndPoint('/users', resource);
    try {
      const res = await axios.post(endPoint.url);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static logIn = async (resource: FooSignInResource): Promise<UserResponse> => {
    const endPoint = new FooEndPoint('/sessions', resource);
    try {
      const res = await axios.post(endPoint.url);
      localStorage.setItem('Access-Token', res.headers['access-token']);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static autoLogIn = async (): Promise<UserResponse> => {
    const endPoint = new FooEndPoint('/sessions');
    try {
      const res: AxiosResponse<UserResponse> = await axios.post(endPoint.url);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static updateName = async (resource: UpdateNameResource): Promise<UserResponse> => {
    const endPoint = new FooEndPoint(`/users/${resource.uid}`, {
      name: resource.name,
    });
    try {
      const res: AxiosResponse<UserResponse> = await axios.patch(endPoint.url);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
