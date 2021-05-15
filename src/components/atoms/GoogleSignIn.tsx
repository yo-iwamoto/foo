import Image from 'next/image';
import React from 'react';

type Props = {
  onClick: () => Promise<void>;
}

export const GoogleSignIn: React.VFC<Props> = ({ onClick }) => {
  const imageUrl = '/images/google_auth.png';
  return (
    <div className="cursor-pointer transform scale-50" onClick={onClick}>
      <Image src={imageUrl} width={382} height={92} />
    </div>
  );
};