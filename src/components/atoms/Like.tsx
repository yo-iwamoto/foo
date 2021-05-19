import React, { useState } from 'react';
import { HeartIcon } from '../atoms/Icons';

type Props = {
  onClick: () => Promise<void>;
}

export const Like: React.VFC<Props> = ({ onClick }) => {
  const [style, setStyle] = useState<string>('text-main');

  return (
    <HeartIcon onClick={onClick} />
  );
};