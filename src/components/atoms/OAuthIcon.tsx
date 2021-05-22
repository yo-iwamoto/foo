import React from 'react';
import { Image } from '@/components/atoms';

type Props = {
  provider: 'google' | 'twitter';
  method: 'signup' | 'login';
  onClick: React.MouseEventHandler<HTMLImageElement>;
};

export const OAuthIcon: React.VFC<Props> = ({ provider, method, onClick }) => {
  const imageUrl = `/images/oauth_icons/${provider}_${method}.svg`;
  return (
    <Image
      src={imageUrl}
      width={189}
      height={45}
      className="cursor-pointer"
      onClick={onClick}
    />
  );
};
