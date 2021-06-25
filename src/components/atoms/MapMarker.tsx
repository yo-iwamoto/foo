import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { Position, Shop } from '@/types';

type Props = {
  position: Position;
  shop: Shop;
  selected?: string;
  select: (id: string) => void;
};

export const MapMarker: React.VFC<Props> = ({ position, select, shop, selected }) => {
  const defaultOption: google.maps.MarkerOptions = { animation: google.maps.Animation.DROP };
  const selectedOption: google.maps.MarkerOptions = { animation: google.maps.Animation.BOUNCE };

  const [markerOption, setMarkerOption] = useState<google.maps.MarkerOptions>(defaultOption);

  useEffect(() => {
    if (shop.id === selected) {
      setMarkerOption(selectedOption);
    } else {
      setMarkerOption(defaultOption);
    }
  }, [selected]);

  return (
    <Marker
      position={position}
      onClick={() => {
        select(shop.id);
      }}
      options={markerOption}
    />
  );
};
