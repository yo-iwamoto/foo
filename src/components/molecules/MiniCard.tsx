import React from 'react';
import { Shop } from '@/types';
import { TrashIcon } from '../atoms/Icons';
import { Flex } from '@/components/utilities';

type Props = {
  shop: Shop | undefined;
  removeLike: (id: string) => Promise<void>;
};

export const MiniCard: React.VFC<Props> = ({ shop, removeLike }) => {
  if (shop) {
    const remove = async (): Promise<void> => {
      const confirmation = confirm('削除しますか？');
      if (confirmation) {
        removeLike(shop.id);
      }
    };

    return (
      <Flex aCenter className="w-full border-main mx-auto shadow-lg rounded-lg text-left leading-loose h-24 sm:h-28">
        <Flex jStart className="w-19/20">
          <a className="hover:opacity-80 h-24 sm:h-28 block" target="_blank" href={shop.urls.pc}>
            <img src={shop.photo.pc.l} className="h-full min-w-24 sm:min-w-28 overflow-hidden block rounded-l-lg" />
          </a>
          <Flex aCenter jBetween className="w-full p-3">
            <a className="hover:underline w-auto block leading-normal" target="_blank" href={shop.urls.pc}>
              <h3 className="font-bold text-sm sm:text-lg">{shop.name}</h3>
              <p className="text-xs sm:text-sm">{shop.catch}</p>
            </a>
          </Flex>
        </Flex>
        <TrashIcon
          className="text-md sm:text-lg block transform -translate-x-1 w-1/20 cursor-pointer hover:text-main"
          onClick={remove}
        />
      </Flex>
    );
  } else {
    return <div />;
  }
};
