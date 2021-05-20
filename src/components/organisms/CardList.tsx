import React from 'react';
import { Shop } from '../../types';
import { Card } from '../molecules';

type Props = {
  shops: Shop[];
};

export const CardList: React.VFC<Props> = ({ shops }) => {
  const like = async (): Promise<boolean> => {
    return false;
  };
  const remove = async (): Promise<void> => {
    console.log('remove');
  };

  return (
    <>
      {shops.map((shop, index) => (
        <Card shop={shop} like={like} removeLike={remove} key={index} />
      ))}
    </>
  );
};