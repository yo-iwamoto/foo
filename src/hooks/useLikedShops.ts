import { ShopsController, UsersLikesController } from '@/api';
import { useCallback } from 'react';
import { useUsersState } from './useSelectors';

export const useLikedShops = (): (() => Promise<void>) => {
  const { uid } = useUsersState();

  const getLikedShops = useCallback(async (): Promise<void> => {
    if (uid) {
      const likedShops = await UsersLikesController.index(uid);
      const ids: string[] = [];
      likedShops.map((shop) => {
        ids.push(shop.hotpepper_id);
      });

      if (!ids.length) {
        return;
      } else if (ids.length <= 10) {
        const { shops } = await ShopsController.index({ ids });
      } else {
        let i = 0;
        for (;;) {
          if (ids.length > i + 10) {
            const { shops } = await ShopsController.index({
              ids: ids.slice(i, i + 10),
            });
            i += 10;
          } else {
            const { shops } = await ShopsController.index({
              ids: ids.slice(i),
            });
            break;
          }
        }
      }
    }
  }, []);

  return getLikedShops;
};
