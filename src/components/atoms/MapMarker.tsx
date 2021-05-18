import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import Image from 'next/image';
import { Position } from '../../types';

type Props = {
  position: Position;
  name: string;
  address: string;
  hid: string;
  onClick: (s: string) => void;
};

export const MapMarker: React.VFC<Props> = ({ position, name, address, hid, onClick }) => {
  const imageUrl = '/images/pin.svg';
  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE} >
      <div className="relative cursor-pointer">
        <Image src={imageUrl} width={35} height={46} onClick={() => onClick(hid)} />
      </div>
    </OverlayView>
  );
};