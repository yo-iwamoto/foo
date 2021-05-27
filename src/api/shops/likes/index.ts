import { axios } from '@/api/axios';
import { GetLikesResponse, LikeResponse, Shop } from '@/types';
import { AxiosResponse } from 'axios';

const index = async (shops: Shop[]): Promise<boolean[]> => {
  try {
    const ids: string[] = [];
    shops.map((shop) => ids.push(shop.id));
    const params = { ids: ids };
    const res = (await axios.post('/shops/check_likes', params)) as AxiosResponse<GetLikesResponse>;
    return res.data!.result;
  } catch (err) {
    throw err;
  }
};

const create = async (hotpepper_id: string): Promise<string> => {
  try {
    const params = { hotpepper_id };
    const res = (await axios.post('/shops/likes', params)) as AxiosResponse<LikeResponse>;
    return res.data!.message;
  } catch (err) {
    throw err;
  }
};

const destroy = async (hotpepper_id: string): Promise<string> => {
  try {
    const res = (await axios.delete(`/shops/likes/${hotpepper_id}`)) as AxiosResponse<LikeResponse>;
    return res.data!.message;
  } catch (err) {
    throw err;
  }
};

export const shopsLikesController = {
  index,
  create,
  destroy,
};
