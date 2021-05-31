import { apiController } from '@/api';
import { getShopsAction } from '@/redux/shops/actions';
import { ShopState, State } from '@/redux/types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

type UseLikesReturnType = {
  like: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useLikes = (): UseLikesReturnType => {
  const dispatch = useDispatch();
  const { shops } = useSelector<State, ShopState>((state) => state.shops, shallowEqual);

  const like = async (id: string): Promise<void> => {
    await apiController.shops.likes.create(id);
    const result = shops;
    result.map((shop) => {
      if (shop.id === id) {
        shop.like = true;
      }
    });
    dispatch(getShopsAction(result));
  };

  const remove = async (id: string): Promise<void> => {
    await apiController.shops.likes.destroy(id);
    const result = shops;
    result.map((shop) => {
      shop.like = false;
    });
  };

  const likesControll: UseLikesReturnType = {
    like,
    remove,
  };

  return likesControll;
};
