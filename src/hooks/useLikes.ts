import { apiController } from '@/api';
// import { updateShopAction } from '@/redux/shops/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type UseLikesReturnType = {
  like: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useLikes = (): UseLikesReturnType => {
  const dispatch = useDispatch();

  const like = useCallback(async (id: string): Promise<void> => {
    const shop = await apiController.shops.likes.create(id);
    // dispatch(updateShopAction(shop));
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    const shop = await apiController.shops.likes.destroy(id);
    // dispatch(updateShopAction(shop));
  }, []);

  const likesControll: UseLikesReturnType = {
    like,
    remove,
  };

  return likesControll;
};
