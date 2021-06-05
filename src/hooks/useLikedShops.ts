import { apiController } from '@/api';
import { addShopsAction, getShopsAction } from '@/redux/shops/actions';
import { Shop } from '@/types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelectors } from './useSelectors';

export const useLikedShops = (): (() => Promise<void>) => {
  const dispatch = useDispatch();

  const {
    users: { uid },
  } = useSelectors();

  const likeAll = useCallback((shops: Shop[]): Shop[] => {
    shops.map((shop) => {
      shop.like = true;
    });
    return shops;
  }, []);

  const getLikedShops = useCallback(async (): Promise<void> => {
    if (uid) {
      const likedShops = await apiController.users.likes.index(uid);
      let ids: string[] = [];
      likedShops.map((shop) => {
        ids.push(shop.hotpepper_id);
      });

      if (!ids.length) {
        return;
      } else if (ids.length <= 10) {
        const { shop } = await apiController.hotpepper.index({ ids });
        likeAll(shop);
        dispatch(getShopsAction(shop));
      } else {
        let i: number = 0;
        while (true) {
          if (ids.length > i + 10) {
            const { shop } = await apiController.hotpepper.index({
              ids: ids.slice(i, i + 10),
            });
            likeAll(shop);
            dispatch(addShopsAction(shop));
            i += 10;
          } else {
            const { shop } = await apiController.hotpepper.index({
              ids: ids.slice(i),
            });
            likeAll(shop);
            dispatch(addShopsAction(shop));
            break;
          }
        }
      }
    }
  }, []);

  return getLikedShops;
};
