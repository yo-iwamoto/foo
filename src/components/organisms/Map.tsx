import React from 'react';
import { LoadScriptNext, GoogleMap } from '@react-google-maps/api';
import { Position, Shop } from '@/types';
import { MapMarker } from '@/components/atoms';

type Props = {
  currentPosition: Position;
  shops: Shop[];
  onClickPin: (s: string) => void;
};

export const Map: React.VFC<Props> = ({
  currentPosition,
  shops,
  onClickPin,
}) => {
  const containerStyle = { width: '100%', height: '500px' };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

  return (
    <LoadScriptNext googleMapsApiKey={apiKey!}>
      <GoogleMap
        center={currentPosition}
        mapContainerStyle={containerStyle}
        zoom={15}
        options={{ disableDefaultUI: true, clickableIcons: false }}
      >
        {shops &&
          shops.map((shop, index) => {
            const shopPosition: Position = { lat: shop.lat, lng: shop.lng };
            return (
              <div className="cursor-pointer hover:bg-red-400" key={index}>
                <MapMarker
                  position={shopPosition}
                  name={shop.name}
                  address={shop.address}
                  hid={shop.id}
                  onClick={onClickPin}
                />
              </div>
            );
          })}
      </GoogleMap>
    </LoadScriptNext>
  );
};
