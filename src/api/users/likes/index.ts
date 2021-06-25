import { axios } from '@/api/lib/axios';
import { AxiosResponse } from 'axios';
import { Shop } from '@/types';
import { FooEndPoint } from '@/api/lib/url';

type IndexResponse = {
  available_count: number;
  shops: Shop[];
};

export class UsersLikesController {
  static index = async (uid: string): Promise<IndexResponse | null> => {
    const endPoint = new FooEndPoint(`/users/${uid}/likes`);
    try {
      const res = (await axios.get(endPoint.url)) as AxiosResponse<IndexResponse>;
      if (res.status === 204) {
        return null;
      } else {
        return res.data;
      }
    } catch (err) {
      throw err;
    }
  };
}
