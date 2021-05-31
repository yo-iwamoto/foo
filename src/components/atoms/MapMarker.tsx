import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { Position, Shop } from '@/types';

type Props = {
  position: Position;
  shop: Shop;
  select: (id: string) => void;
  selected?: string;
};

export const MapMarker: React.VFC<Props> = ({ position, select, shop, selected }) => {
  const [entering, setEntering] = useState<boolean>(true);
  const isSelected = (): boolean => selected === shop.id;
  const markerOption: google.maps.MarkerOptions = {
    animation: entering ? google.maps.Animation.DROP : isSelected() ? google.maps.Animation.BOUNCE : undefined,
  };

  useEffect(() => {
    setTimeout(() => {
      setEntering(false);
    }, 1000);
  }, []);
  return (
    // <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
    //   <Flex aEnd className="cursor-pointer" onClick={onClick}>
    //     <div className="relative">
    //       {/* <PinAltIcon
    //         className={cn({
    //           ['text-4xl transform transition-transform -translate-x-1/2 -translate-y-full text-main origin-bottom']: true,
    //           ['scale-150']: selected
    //         })}
    //       /> */}
    //       <PinAltIcon className="absolute transform transition-transform origin-bottom -translate-x-1/2 -translate-y-full text-main text-4xl" />
    //       <UtensilsIcon className="absolute transform transition-transform origin-bottom - translate-x-1/2 -translate-y-full text-white text-xl" />
    //     </div>
    //   </Flex>
    // </OverlayView>
    <Marker position={position} onClick={() => select(shop.id)} options={markerOption} />
  );
};
