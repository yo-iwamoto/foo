import { useCallback, useState } from 'react';
import { Position } from '@/types';

interface GoogleMapEvent {
  latLng: {
    lat: () => number;
    lng: () => number;
  };
}

export const useCustomMarker = (): [
  markerPosition: Position | undefined,
  putMarker: (e: GoogleMapEvent) => void,
  removeMarker: () => void,
] => {
  const [markerPosition, setMarkerPosition] = useState<Position | undefined>();

  const putMarker = useCallback((e: GoogleMapEvent): void => {
    const position: Position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(position);
  }, []);

  const removeMarker = useCallback((): void => {
    setMarkerPosition(undefined);
  }, []);

  return [markerPosition, putMarker, removeMarker];
};
