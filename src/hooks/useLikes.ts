import { apiController } from '@/api';
import { getShopsAction } from '@/redux/shops/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectors } from './useSelectors';

type UseLikesReturnType = {
  like: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useLikes = (): UseLikesReturnType => {
  const dispatch = useDispatch();
  const {
    shops: { shops },
  } = useSelectors();

  const like = useCallback(async (id: string): Promise<void> => {
    await apiController.shops.likes.create(id);
    const result = shops;
    result.map((shop) => {
      if (shop.id === id) {
        shop.like = true;
      }
    });
    dispatch(getShopsAction(result));
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    await apiController.shops.likes.destroy(id);
    const result = shops;
    result.map((shop) => {
      shop.like = false;
    });
  }, []);

  const likesControll: UseLikesReturnType = {
    like,
    remove,
  };

  return likesControll;
};
