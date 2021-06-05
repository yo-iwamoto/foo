import { endLoadingAction, startLoadingAction } from '@/redux/utilities/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useLoadingControll = (): [startLoading: () => void, endLoading: () => void] => {
  const dispatch = useDispatch();

  const startLoading = useCallback((): void => {
    dispatch(startLoadingAction());
  }, []);

  const endLoading = useCallback((): void => {
    dispatch(endLoadingAction());
  }, []);

  return [startLoading, endLoading];
};
