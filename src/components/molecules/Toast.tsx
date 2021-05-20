import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { State, UtilityState } from '../../redux/types';
import cn from 'classnames';
import { CheckCircleIcon, TimesCircleIcon } from '../atoms/Icons';
import { Spacer } from '../utilities';
import { closeToastAction } from '../../redux/utilities/actions';

export const Toast: React.VFC = () => {
  const { toast } = useSelector<State, UtilityState>(state => state.utilities, shallowEqual);
  const dispatch = useDispatch();
  const [hide, setHide] = useState<boolean>(true);

  useEffect(() => {
    setHide(false);
    setTimeout(() => {
      setHide(true);
      setTimeout(() => {
        dispatch(closeToastAction());
      }, 1000)
    }, 3000)
  }, [])

  return (
    <div
      className={cn({
        ['transform transition-transform']: true,
        ['translate-x-full']: hide
      })}
    >
      <div
        className={cn({
          ['fixed left-auto top-8 right-4 md:right-8 w-4/5 sm:w-3/4 md:w-1/2 lg:w-2/5 h-12 rounded-lg p-2 border-2']: true,
          ['border-green-300 bg-green-100']: toast.type === 'success',
          ['border-red-500 bg-red-100']: toast.type === 'error'
        })}
      >
        <div className="flex items-center h-full">
          {toast.type === 'success'
            ? <span>🎉</span>
            : <span>🤔</span>
            // ? <CheckCircleIcon className="text-green-500 text-xl" />
            // : <TimesCircleIcon className="text-red-500 text-xl" />
          }
          <Spacer w={3} />
          <p>{toast.message}</p>
        </div>
      </div>
    </div>
  );
};