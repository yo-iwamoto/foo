import { axios } from '@/api/lib/axios';
import { FooShop } from '@/types';
import { AxiosResponse } from 'axios';

const create = async (hotpepper_id: string): Promise<FooShop> => {
  try {
    const res = (await axios.post(`/shops/${hotpepper_id}/likes`)) as AxiosResponse<FooShop>;
    return res.data;
  } catch (err) {
    throw err;
  }
};

const destroy = async (hotpepper_id: string): Promise<FooShop> => {
  try {
    const res = (await axios.delete(`/shops/${hotpepper_id}/likes/1`)) as AxiosResponse<FooShop>;
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const shopsLikesController = {
  create,
  destroy,
};
