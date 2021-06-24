import { ShopsLikesController } from '@/api';
import { useCallback } from 'react';

type UseLikesReturnType = {
  like: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useLikes = (): UseLikesReturnType => {
  const like = useCallback(async (id: string): Promise<void> => {
    await ShopsLikesController.create(id);
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    await ShopsLikesController.destroy(id);
  }, []);

  const likesControll: UseLikesReturnType = {
    like,
    remove,
  };

  return likesControll;
};
