import React from 'react';
import { OverlayView } from '@react-google-maps/api';
import { Position } from '@/types';
import { Image } from '@/components/atoms';
import { Flex, Spacer } from '../utilities';

type Props = {
  position: Position;
  name: string;
  address: string;
  hid: string;
  onClick: () => void;
};

export const MapMarker: React.VFC<Props> = ({ position, name, address, hid, onClick }) => {
  const imageUrl = '/images/pin.svg';

  return (
    <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
      <Flex aEnd className="hover:text-blue-500 hover:opacity-80 cursor-pointer -translate-y-12" onClick={onClick}>
        <div className="transition transform">
          <Image src={imageUrl} width={40} height={53} />
        </div>
        {/* <Spacer w={2} />
        <p className="font-bold text-lg hover:opacity-100 bg-white rounded-lg">{name}</p> */}
      </Flex>
    </OverlayView>
  );
};
