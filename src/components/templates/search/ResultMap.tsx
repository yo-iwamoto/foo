import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { Shop } from '../../../types';
import { searchWithKeywordAndPosition } from '../../../api/externals/shops';

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
  const dispatch = useDispatch(),
        router = useRouter();

  const { shops } = useSelector<State, ShopState>(state => state.shops, shallowEqual),
        { isLoading } = useSelector<State, UtilityState>(state => state.utilities, shallowEqual);

  const initialPosition: Position = { lat: 35.68812, lng: 139.7671 };
        
  const [currentPosition, setCurrentPosition] = useState<Position>(initialPosition),
        [selectedShop, setSelectedShop] = useState<Shop | undefined>(undefined),
        [shopsCount, setShopsCount] = useState<number>(0);

  const handleSuccess = (data: GeolocationData): void => {
    const position: Position = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
    };
    setCurrentPosition(position);
    search(position);
  };

  const handleError = (err: any): void => {
    throw err;
  };

  const search = (searchPosition: Position) => {
    const query = router.query.word as string;
    if (query) {
      const keyword = query.replace(/\s+/g, ' ');
      searchWithKeywordAndPosition(keyword, searchPosition, 5).then(res => {
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

  const onClickPin = (hotpepper_id: string): void => {
    const shop = shops.filter(shop => {
      return shop.id === hotpepper_id;
    });
    setSelectedShop(shop[0]);
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
          <div className="px-4 sm:px-8 lg:px-20">
            <h1>3km以内に{shopsCount}件のお店が見つかりました</h1>
            <Card shop={selectedShop} />
          </div>
          <Spacer h={8} />
        </>
      }
    </>
  );
};