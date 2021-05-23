import React from 'react';
import { Shop } from '@/types';
import { MiniCard } from '@/components/molecules';
import { Spacer } from '../utilities';

type Props = {
  shops: Shop[];
  remove: (id: string) => Promise<void>;
};

export const CardList: React.VFC<Props> = ({ shops, remove }) => {
  return (
    <div className="w-full md:w-4/5 lg:w-2/3 mx-auto">
      {shops.map((shop, index) => (
        <div key={index}>
          <MiniCard shop={shop} removeLike={remove} />
          <Spacer h={3} />
        </div>
      ))}
    </div>
  );
};
