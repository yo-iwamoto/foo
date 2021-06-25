import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShopsController, ShopsLikesController } from '@/api';
import { useDispatch } from 'react-redux';
import { raiseModalAction, selectAction } from '@/redux/utilities/actions';
import { Position, Shop } from '@/types';
import { modalTemplates } from '@/lib/modals';
import Skeleton from 'react-loading-skeleton';
import { Map, SearchBar, ShopCard } from '@/components/organisms';
import { Flex, Spacer } from '@/components/utilities';
import { useInput } from '@/hooks/useInput';
import { useLoadingControll } from '@/hooks/useLoadingControll';
import { useUsersState, useUtilitiesState } from '@/hooks/useSelectors';

interface GeolocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const Search: React.VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, selectedShopId } = useUtilitiesState();
  const { isLoggedIn } = useUsersState();

  const initialPosition: Position = { lat: 35.68812, lng: 139.7671 };

  const [currentPosition, setCurrentPosition] = useState<Position>(initialPosition);
  const [shopsCount, setShopsCount] = useState<number>(0);
  const [shops, setShops] = useState<Shop[]>([]);
  const [startLoading, endLoading] = useLoadingControll();

  const search = async (data: GeolocationData): Promise<void> => {
    const query = router.query.word as string;
    const position: Position = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    setCurrentPosition(position);
    const keyword = query.replace(/\s+/g, ' ');
    const res = await ShopsController.index({
      keyword: keyword,
      position,
      range: 5,
    });
    setShops(res.shops);
    setShopsCount(res.available_count);
    endLoading();
  };

  useEffect(() => {
    startLoading();
    if (router.query.word) {
      navigator.geolocation.getCurrentPosition(search, (err: any) => {
        throw err;
      });
    }
  }, [router.query.word]);

  // likes controll

  const addLike = async (id: string): Promise<void> => {
    if (isLoggedIn) {
      try {
        await ShopsLikesController.create(id);
      } catch (err) {
        throw err;
      }
    } else {
      dispatch(raiseModalAction(modalTemplates.like));
    }
  };
  const removeLike = async (id: string): Promise<void> => {
    try {
      await ShopsLikesController.destroy(id);
    } catch (err) {
      throw err;
    }
  };

  // SearchBar setting

  const initialValue = router.query.word as string;
  const [text, onChangeText] = useInput(initialValue);
  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (text) {
      router.push(`/search/?word=${text}`);
      if (text === router.query.word) {
        router.reload();
      }
    }
  };

  const select = (id: string): void => {
    const shop = shops!.find((shop) => shop.id === id);
    const position: Position = {
      lat: shop!.lat,
      lng: shop!.lng,
    };
    setCurrentPosition(position);
    dispatch(selectAction(id));
  };

  return (
    <>
      {isLoading || shops.length === 0 ? (
        <Skeleton duration={1} style={{ height: '500px' }} />
      ) : (
        <Map currentPosition={currentPosition} shops={shops} select={select} selectedShopId={selectedShopId} />
      )}
      <Spacer h={6} />
      <SearchBar isLoading={isLoading} value={text} onChange={onChangeText} onSubmit={onSubmit} />
      <Spacer h={3} />
      <div className="px-4 w-full">
        <h1>現在地周辺に{shopsCount}件のお店が見つかりました</h1>
        <Spacer h={4} />
        <div className="flex overflow-x-scroll scroll-hidden">
          {shops.map((shop, index) => (
            <Flex key={index}>
              <Spacer w={2} />
              <ShopCard
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                shop={shop}
                like={addLike}
                remove={removeLike}
                select={select}
                selected={selectedShopId}
                square
              />
              <Spacer w={2} />
            </Flex>
          ))}
        </div>
      </div>
      <Spacer h={8} />
    </>
  );
};
