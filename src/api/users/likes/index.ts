import { axios } from '@/api/axios';
import { AxiosResponse } from 'axios';
import { FooShop } from '@/types';

type LikedShopIndexResponse = {
  shops: FooShop[];
};

const index = async (uid: string): Promise<FooShop[]> => {
  try {
    const res = (await axios.get(`/users/${uid}/likes`)) as AxiosResponse<LikedShopIndexResponse>;
    return res.data.shops;
  } catch (err) {
    throw err;
  }
};

export const usersLikesController = {
  index,
};
