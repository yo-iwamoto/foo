import React from 'react';
import { LoadScriptNext, GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { Position, Shop } from '@/types';
import { MapMarker } from '@/components/atoms';

type Props = {
  currentPosition: Position;
  shops: Shop[];
  select: (id: string) => void;
  selectedShopId: string;
};

export const Map: React.VFC<Props> = ({ currentPosition, shops, select, selectedShopId }) => {
  const containerStyle = { width: '100%', height: '500px' };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;
  // const handleClick = (e: any) => {
  //   console.log(e.latLng!.lat());
  //   console.log(e.latLng!.lng());
  // };

  return (
    <LoadScriptNext googleMapsApiKey={apiKey!}>
      <GoogleMap
        center={currentPosition}
        mapContainerStyle={containerStyle}
        zoom={16}
        options={{ disableDefaultUI: true, clickableIcons: false, streetViewControl: true }}
      >
        {shops &&
          shops.map((shop, index) => {
            const shopPosition: Position = { lat: shop.lat, lng: shop.lng };
            return (
              <div className="cursor-pointer hover:bg-red-400" key={index}>
                <MapMarker position={shopPosition} shop={shop} select={select} selected={selectedShopId} />
              </div>
            );
          })}
      </GoogleMap>
    </LoadScriptNext>
  );
};
