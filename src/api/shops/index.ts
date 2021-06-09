import { Shop, FooShop } from '@/types';
import { axios } from '../axios';
import { AxiosResponse } from 'axios';

const index = async (shops: Shop[]): Promise<FooShop[]> => {
  try {
    const ids: string[] = [];
    shops.map((shop) => ids.push(shop.id));
    const params = { ids: ids };
    const res = (await axios.get('/shops', { params })) as AxiosResponse<FooShop[]>;
    return res.data;
  } catch (err) {
    throw err;
  }
};

const show = async (id: string): Promise<FooShop> => {
  try {
    const res = (await axios.get(`/shops/${id}`)) as AxiosResponse<FooShop>;
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const shopsController = {
  index,
  show,
};
