import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import { Position, Shop } from '@/types';
import { Flex } from '../utilities';
import { PinAltIcon } from './Icons';
import cn from 'classnames';

type Props = {
  position: Position;
  shop: Shop;
  onClick: () => void;
};

export const MapMarker: React.VFC<Props> = ({ position, shop, onClick }) => {
  const imageUrl = '/images/pin.svg';

  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
      <Flex aEnd className="cursor-pointer" onClick={onClick}>
        <div className="">
          <PinAltIcon
            className={cn({
              ['text-4xl transform -translate-x-1/2 -translate-y-full text-main']: true,
            })}
          />
        </div>
      </Flex>
    </OverlayView>
  );
};
