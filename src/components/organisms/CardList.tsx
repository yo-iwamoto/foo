import React from 'react';
import { Shop } from '@/types';
import { Card } from '@/components/molecules';
import { Spacer } from '../utilities';

type Props = {
  shops: Shop[];
  like: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const CardList: React.VFC<Props> = ({ shops, like, remove }) => {
  return (
    <div className="w-full mx-auto">
      {shops.map((shop, index) => (
        <div key={index}>
          <Card shop={shop} like={like} remove={remove} />
          <Spacer h={3} />
        </div>
      ))}
    </div>
  );
};
