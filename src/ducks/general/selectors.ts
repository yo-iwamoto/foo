import { useSelector } from 'react-redux';
import { GeneralState } from './slice';

export const useGeneralState = () => {
  return useSelector((state: { general: GeneralState }) => state);
};