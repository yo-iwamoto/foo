import { ShopsLikesController } from '@/api';
import { ShopsReportsController } from '@/api/shops/reports';
import { modalTemplates } from '@/lib/modals';
import { raiseModalAction } from '@/redux/utilities/actions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUsersState } from './useSelectors';

export const useShopStatus = (
  like: boolean,
  foo: boolean,
  shopId: string,
): [
  likeState: boolean,
  fooState: boolean,
  toggleLike: () => Promise<number | undefined>,
  toggleFoo: () => Promise<number | undefined>,
] => {
  const [likeState, setLikeState] = useState(like);
  const [fooState, setFooState] = useState(foo);

  const { isLoggedIn } = useUsersState();
  const dispatch = useDispatch();

  const raiseModal = () => dispatch(raiseModalAction(modalTemplates.like));

  const toggleLike = async (): Promise<number | undefined> => {
    if (isLoggedIn) {
      if (likeState) {
        setLikeState(false);
        try {
          const res = await ShopsLikesController.destroy(shopId);
          return res.likes_count;
        } catch (err) {
          setLikeState(true);
        }
      } else {
        setLikeState(true);
        try {
          const res = await ShopsLikesController.create(shopId);
          return res.likes_count;
        } catch (err) {
          setLikeState(false);
        }
      }
    } else {
      raiseModal();
    }
  };

  const toggleFoo = async (): Promise<number | undefined> => {
    if (isLoggedIn) {
      if (fooState) {
        setFooState(false);
        try {
          const res = await ShopsReportsController.destroy(shopId);
          return res.foo_count;
        } catch (err) {
          setFooState(true);
        }
      } else {
        setFooState(true);
        try {
          const res = await ShopsReportsController.create(shopId);
          return res.foo_count;
        } catch (err) {
          setFooState(false);
        }
      }
    } else {
      raiseModal();
    }
  };

  return [likeState, fooState, toggleLike, toggleFoo];
};
