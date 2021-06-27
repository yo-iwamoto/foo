import React from 'react';
import { ClipIcon, HeartIcon, HeartOutlineIcon } from '@/components/atoms/Icons';
import cn from 'classnames';

type Props = {
  likeState: boolean;
  onClick: React.MouseEventHandler<SVGElement>;
  className?: string;
};

export const Like: React.VFC<Props> = ({ likeState, onClick, className }) => {
  return (
    <ClipIcon
      className={cn({
        ['cursor-pointer text-2xl']: true,
        ['text-main']: likeState,
        [className!]: className,
      })}
      onClick={onClick}
    />
  );
};
