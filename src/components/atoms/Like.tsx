import React from 'react';
import { HeartIcon, HeartOutlineIcon } from '@/components/atoms/Icons';

type Props = {
  likeState: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Like: React.VFC<Props> = ({ likeState, onClick }) => {
  return (
    <div className="text-2xl cursor-pointer" onClick={onClick}>
      {likeState ? <HeartIcon className="text-main" /> : <HeartOutlineIcon className="text-gray-700" />}
    </div>
  );
};
