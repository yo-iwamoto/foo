import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { apiController } from '@/api';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { startLoadingAction, endLoadingAction, raiseModalAction } from '@/redux/utilities/actions';
import { getShopsAction } from '@/redux/shops/actions';
import { State, ShopState, UtilityState, UserState } from '@/redux/types';
import { Position } from '@/types';
import { modalTemplates } from '@/lib/modals';

import Skeleton from 'react-loading-skeleton';
import { Map, SearchBar, ShopCard } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { useLikes } from '@/hooks/useLikes';
import { useInput } from '@/hooks/useInput';

interface GeolocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const Search: React.VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { shops } = useSelector<State, ShopState>((state) => state.shops, shallowEqual);
  const { isLoading } = useSelector<State, UtilityState>((state) => state.utilities, shallowEqual);
  const { isLoggedIn } = useSelector<State, UserState>((state) => state.users, shallowEqual);

  const initialPosition: Position = { lat: 35.68812, lng: 139.7671 };

  const [currentPosition, setCurrentPosition] = useState<Position>(initialPosition);
  const [shopsCount, setShopsCount] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>('');

  const search = async (data: GeolocationData): Promise<void> => {
    const query = router.query.word as string;
    const position: Position = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    setCurrentPosition(position);
    if (query) {
      const keyword = query.replace(/\s+/g, ' ');
      const { shop, results_available } = await apiController.hotpepper.index({
        keyword: keyword,
        position,
        range: 5,
      });
      setShopsCount(results_available);
      const likedShops = await apiController.shops.likes.index(shop);
      const result = shop;
      result.map((shop, index) => {
        shop.like = likedShops[index];
      });
      dispatch(getShopsAction(result));
      dispatch(endLoadingAction());
    }
  };

  useEffect(() => {
    dispatch(startLoadingAction());
    navigator.geolocation.getCurrentPosition(search, (err: any) => {
      throw err;
    });
  }, [router.query.word]);

  // likes controll

  const likesControll = useLikes();
  const suggestLogIn = (): void => {
    dispatch(raiseModalAction(modalTemplates.like));
  };
  const like = async (id: string): Promise<void> => {
    if (isLoggedIn) {
      await likesControll.like(id);
    } else {
      dispatch(raiseModalAction(modalTemplates.like));
    }
  };
  const remove = async (id: string): Promise<void> => {
    await likesControll.remove(id);
  };

  // SearchBar setting

  const initialValue = router.query.word as string;
  const [text, onChangeText] = useInput(initialValue);
  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (text) {
      router.push(`/search/?word=${text}`);
    }
  };

  const select = (id: string): void => {
    const shop = shops.find((shop) => shop.id === id);
    const position: Position = {
      lat: shop!.lat,
      lng: shop!.lng,
    };
    setCurrentPosition(position);
    setSelectedId(id);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton style={{ height: '500px' }} />
          <Spacer h={6} />
          <Skeleton
            style={{
              height: '60px',
              width: '300px',
              margin: 'auto',
              display: 'block',
            }}
          />
        </>
      ) : (
        <>
          <Map currentPosition={currentPosition} shops={shops} select={select} selected={selectedId} />
          <Spacer h={6} />
          <SearchBar value={text} onChange={onChangeText} onSubmit={onSubmit} />
          <Spacer h={3} />
          <div className="px-4 w-full">
            <h1>3km以内に{shopsCount}件のお店が見つかりました</h1>
            <Spacer h={4} />
            <div className="flex overflow-x-scroll scroll-hidden">
              {shops.map((shop, index) => (
                <Flex key={index}>
                  <Spacer w={2} />
                  <ShopCard
                    shop={shop}
                    like={isLoggedIn ? like : suggestLogIn}
                    remove={remove}
                    select={select}
                    selected={selectedId}
                    square
                  />
                  <Spacer w={2} />
                </Flex>
              ))}
            </div>
          </div>
          <Spacer h={8} />
        </>
      )}
    </>
  );
};
