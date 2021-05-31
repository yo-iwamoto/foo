import React from 'react';
import { LoadScriptNext, GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { Position, Shop } from '@/types';
import { MapMarker } from '@/components/atoms';

type Props = {
  currentPosition: Position;
  shops: Shop[];
};

export const Map: React.VFC<Props> = ({ currentPosition, shops }) => {
  const containerStyle = { width: '100%', height: '500px' };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;
  const handleClick = (e: any) => {
    console.log(e.latLng!.lat());
    console.log(e.latLng!.lng());
  };
  const a: GoogleMapProps = {
    options: {
      scrollwheel: true,
    },
  };

  const onClick = (): void => {
    alert('clicked');
  };

  return (
    <LoadScriptNext googleMapsApiKey={apiKey!}>
      <GoogleMap
        center={currentPosition}
        mapContainerStyle={containerStyle}
        zoom={15}
        options={{ disableDefaultUI: true, clickableIcons: false, scrollwheel: true }}
        onClick={handleClick}
      >
        {shops &&
          shops.map((shop, index) => {
            const shopPosition: Position = { lat: shop.lat, lng: shop.lng };
            return (
              <div className="cursor-pointer hover:bg-red-400" key={index}>
                <MapMarker position={shopPosition} shop={shop} onClick={onClick} />
              </div>
            );
          })}
      </GoogleMap>
    </LoadScriptNext>
  );
};
