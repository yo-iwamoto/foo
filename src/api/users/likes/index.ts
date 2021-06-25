import { axios } from '@/api/lib/axios';
import { AxiosResponse } from 'axios';
import { Shop } from '@/types';

type IndexResponse = {
  available_count: number;
  shops: Shop[];
};

export class UsersLikesController {
  static index = async (uid: string): Promise<IndexResponse | null> => {
    try {
      const res = (await axios.get(`/users/${uid}/likes`)) as AxiosResponse<IndexResponse>;
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
