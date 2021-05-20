import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import { Shop } from '../../../types';
import { searchWithKeywordAndPosition } from '../../../api/externals/shops';
import { getLikes, likeShop } from '../../../api/shops';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { startLoadingAction, endLoadingAction } from '../../../redux/utilities/actions';
import { getShopsAction } from '../../../redux/shops/actions';
import { State, ShopState , UtilityState} from '../../../redux/types';
import { Position } from '../../../types';

import { Loader, SubHeading, Image } from '../../atoms';
import { Map } from '../../organisms';
import { Spacer } from '../../utilities';
import { Card } from '../../molecules';

interface GeolocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const ResultMap: React.VFC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { shops } = useSelector<State, ShopState>(state => state.shops, shallowEqual);
  const { isLoading } = useSelector<State, UtilityState>(state => state.utilities, shallowEqual);

  const initialPosition: Position = { lat: 35.68812, lng: 139.7671 };
        
  const [currentPosition, setCurrentPosition] = useState<Position>(initialPosition);
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>(undefined);
  const [shopsCount, setShopsCount] = useState<number>(0);
  const [likes, setLikes] = useState<boolean[]>([]);

  const handleSuccess = (data: GeolocationData): void => {
    const position: Position = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
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
      searchWithKeywordAndPosition(keyword, searchPosition, 5).then(res => {
        getLikes(res.shop).then(res => setLikes(res));
        setShopsCount(res.results_available);
        dispatch(getShopsAction(res.shop, 1));
        dispatch(endLoadingAction());
      });
    } else {
      if (shops.length !== 0) {
        setTimeout(search.bind(undefined, initialPosition), 1000)
      }
    }
  };

  useEffect(() => {
    dispatch(startLoadingAction());
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [router.query.word]);

  const ref = useRef<HTMLDivElement>(null);

  const onClickPin = (hotpepper_id: string): void => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    const shop = shops.filter(shop => {
      return shop.id === hotpepper_id;
    })[0];
    setCurrentPosition({ lat: shop.lat, lng: shop.lng });
    setSelectedShop(shop);
  };

  const like = async (id: string): Promise<void> => {
    try {
      await likeShop(id);
      const res = await getLikes(shops);
      setLikes(res);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {isLoading
        ? <>
            <Spacer h={28} />
            <Loader />
            <Spacer h={12} />
            <h1 className="text-center">すてきなお店を探しています...</h1>
          </>
        : <>
            <Map currentPosition={currentPosition} shops={shops} onClickPin={onClickPin} />
            <Spacer h={6} />
            <div className="px-4 sm:px-8 lg:px-20" ref={ref} >
              <h1>3km以内に{shopsCount}件のお店が見つかりました</h1>
              <Card shop={selectedShop} like={like} />
            </div>
            <Spacer h={8} />
          </>
      }
    </>
  );
};