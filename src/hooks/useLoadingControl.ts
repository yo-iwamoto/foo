import { useDispatch } from 'react-redux';

export const useLoadingControl = (): [startLoading: () => void, endLoading: () => void] => {
  const dispatch = useDispatch();
  const startLoading = () => {
    dispatch(startLoading());
  };
  const endLoading = () => {
    dispatch(endLoading());
  };
  return [startLoading, endLoading];
};
