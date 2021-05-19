import React, { useState } from 'react';
import { OverlayView } from '@react-google-maps/api';
import cn from 'classnames';
import { Position } from '../../types';
import { Image } from '../atoms';

type Props = {
  position: Position;
  name: string;
  address: string;
  hid: string;
  onClick: (s: string) => void;
};

export const MapMarker: React.VFC<Props> = ({ position, name, address, hid, onClick }) => {
  const imageUrl = '/images/pin.svg';
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  
  const defaultStyle = '-translate-y-12 transition transition-transform transform origin-bottom';
  const hoverStyle = defaultStyle + ' scale-150';

  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE} >
      <div
        className={cn({
          [defaultStyle]: !mouseOver,
          [hoverStyle]: mouseOver
        })}
      >
        <Image
          src={imageUrl}
          width={40}
          height={53}
          onMouseOver={() => {setMouseOver(true)}}
          onMouseLeave={() => {setMouseOver(false)}}
          onClick={() => onClick(hid)}
        />
      </div>
    </OverlayView>
  );
};