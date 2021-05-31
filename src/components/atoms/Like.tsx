import React from 'react';
import { HeartIcon, HeartOutlineIcon } from '@/components/atoms/Icons';
import cn from 'classnames';

type Props = {
  likeState: boolean;
  onClick: React.MouseEventHandler<SVGElement>;
  className?: string;
};

export const Like: React.VFC<Props> = ({ likeState, onClick, className }) => {
  if (likeState) {
    return (
      <HeartIcon
        className={cn({
          ['cursor-pointer text-2xl text-main']: true,
          [className!]: className,
        })}
        onClick={onClick}
      />
    );
  } else {
    return (
      <HeartOutlineIcon
        className={cn({
          ['cursor-pointer text-2xl']: true,
          [className!]: className,
        })}
        onClick={onClick}
      />
    );
  }
};
