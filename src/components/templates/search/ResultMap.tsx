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
import { ResultList } from '@/components/organisms/ResultList';

interface GeolocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const ResultMap: React.VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { shops } = useSelector<State, ShopState>((state) => state.shops, shallowEqual);
  const { isLoading } = useSelector<State, UtilityState>((state) => state.utilities, shallowEqual);
  const { isLoggedIn } = useSelector<State, UserState>((state) => state.users, shallowEqual);

  const initialPosition: Position = { lat: 35.68812, lng: 139.7671 };

  const [currentPosition, setCurrentPosition] = useState<Position>(initialPosition);
  const [shopsCount, setShopsCount] = useState<number>(0);

  const handleSuccess = (data: GeolocationData): void => {
    const position: Position = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    setCurrentPosition(position);
    search(position);
  };

  const handleError = (err: any) => {
    throw err;
  };

  const search = (searchPosition: Position) => {
    const query = router.query.word as string;
    if (query) {
      const keyword = query.replace(/\s+/g, ' ');
      apiController.hotpepper
        .index({
          keyword: keyword,
          position: searchPosition,
          range: 5,
        })
        .then((res) => {
          const getShops = res.shop;
          if (isLoggedIn) {
            apiController.shops.likes.index(getShops).then((likes) => {
              getShops.map((shop, index) => {
                shop.like = likes[index];
              });
              dispatch(getShopsAction(getShops));
              setShopsCount(res.results_available);
              dispatch(endLoadingAction());
            });
          } else {
            dispatch(getShopsAction(getShops));
            setShopsCount(res.results_available);
            dispatch(endLoadingAction());
          }
        });
    } else {
      if (shops.length !== 0) {
        setTimeout(search.bind(undefined, initialPosition), 1000);
      }
    }
  };

  useEffect(() => {
    dispatch(startLoadingAction());
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [router.query.word]);

  const ref = useRef<HTMLDivElement>(null);

  const onClickPin = (hotpepper_id: string): void => {
    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const shop = shops.filter((shop) => {
      return shop.id === hotpepper_id;
    })[0];
    setCurrentPosition({ lat: shop.lat, lng: shop.lng });
    console.log(shop);
  };

  const like = async (id: string): Promise<boolean> => {
    if (isLoggedIn) {
      try {
        await apiController.shops.likes.create(id);
        const result = shops;
        result.map((shop) => {
          if (shop.id === id) {
            shop.like = true;
          }
        });
        dispatch(getShopsAction(result));
        return true;
      } catch (err) {
        throw err;
      }
    } else {
      dispatch(raiseModalAction(modalTemplates.like));
      return false;
    }
  };

  const remove = async (id: string): Promise<void> => {
    try {
      await apiController.shops.likes.destroy(id);
      let result = shops;
      result.map((shop) => {
        if (shop.id === id) {
          shop.like = false;
        }
      });
      dispatch(getShopsAction(result));
    } catch (err) {
      throw err;
    }
  };

  // SearchBar setting

  const initialValue = router.query.word as string;
  const [text, setText] = useState<string>(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
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
          <SearchBar value={text} onChange={onChange} onSubmit={onSubmit} />
          <Spacer h={3} />
          <div className="px-4 w-full md:w-4/5 lg:w-1/2 mx-auto" ref={ref}>
            <h1>3km以内に{shopsCount}件のお店が見つかりました</h1>
            <Spacer h={4} />
            <ResultList shops={shops} like={like} remove={remove} />
          </div>
          <Spacer h={8} />
        </>
      )}
    </>
  );
};
