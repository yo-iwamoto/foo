import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

type Props = {
  onClick: () => Promise<void>;
}

export const Like: React.VFC<Props> = ({ onClick }) => {
  const [style, setStyle] = useState<string>('text-main');

  return (
    <FaHeart onClick={onClick} />
  );
};