import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { apiController } from '@/api';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { startLoadingAction, endLoadingAction, raiseModalAction } from '@/redux/utilities/actions';
import { getShopsAction } from '@/redux/shops/actions';
import { State, ShopState, UtilityState, UserState } from '@/redux/types';
import { Position } from '@/types';
import { modalTemplates } from '@/lib/modals';

import Skelton from 'react-loading-skeleton';
import { Map, SearchBar } from '@/components/organisms';
import { Spacer } from '@/components/utilities';
import { Card } from '@/components/organisms';
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
      console.log(likedShops);
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

  const ref = useRef<HTMLDivElement>(null);

  // const onClickPin = (hotpepper_id: string): void => {
  //   ref!.current!.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });
  //   const shop = shops.filter((shop) => {
  //     return shop.id === hotpepper_id;
  //   })[0];
  //   setCurrentPosition({ lat: shop.lat, lng: shop.lng });
  // };

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

  return (
    <>
      {isLoading ? (
        <>
          <Skelton style={{ height: '500px' }} />
          <Spacer h={6} />
          <Skelton
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
          <Map currentPosition={currentPosition} shops={shops} />
          <Spacer h={6} />
          <SearchBar value={text} onChange={onChangeText} onSubmit={onSubmit} />
          <Spacer h={3} />
          <div className="px-4 w-full md:w-3/4 lg:w-3/5 mx-auto" ref={ref}>
            <h1>3km以内に{shopsCount}件のお店が見つかりました</h1>
            <Spacer h={4} />
            <div>
              {shops.map((shop, index) => (
                <div key={index}>
                  <Card shop={shop} like={isLoggedIn ? like : suggestLogIn} remove={remove} />
                  <Spacer h={3} />
                </div>
              ))}
            </div>
          </div>
          <Spacer h={8} />
        </>
      )}
    </>
  );
};
