import React, { useState } from 'react';
import { Shop } from '@/types';

import { Flex } from '@/components/utilities';
import { Like } from '../atoms';

type Props = {
  shop: Shop | undefined;
  like: (id: string) => Promise<boolean>;
  remove: (id: string) => Promise<void>;
};

export const Card: React.VFC<Props> = ({ shop, like, remove }) => {
  if (shop) {
    const [likeState, setLikeState] = useState<boolean>(shop.like!);
    const onClick = async (): Promise<void> => {
      if (likeState) {
        remove(shop.id);
        setLikeState(false);
      } else {
        try {
          setLikeState(true);
          const success = await like(shop.id);
          if (!success) {
            setLikeState(false);
          }
        } catch (err) {
          throw err;
        }
      }
    };
    const hotpepperImageUrl = '/images/hot_pepper.png';

    return (
      <Flex aCenter className="w-full border-main mx-auto shadow-lg rounded-lg text-left leading-loose h-24 sm:h-28">
        <Flex jStart className="w-19/20">
          <a className="hover:opacity-80 h-24 sm:h-28 block" target="_blank" href={shop.urls.pc}>
            <img src={shop.photo.pc.l} className="h-full min-w-24 sm:min-w-28 overflow-hidden block rounded-l-lg" />
          </a>
          <Flex aCenter jBetween className="w-full p-3 overflow-hidden">
            <a className="hover:underline w-auto block leading-normal" target="_blank" href={shop.urls.pc}>
              <h3 className="font-bold text-sm sm:text-lg whitespace-nowrap overflow-ellipsis">{shop.name}</h3>
              <p className="text-xs sm:text-sm">{shop.catch}</p>
            </a>
          </Flex>
        </Flex>
        {/* <div className="text-md sm:text-lg block transform -translate-x-1 w-1/20 cursor-pointer hover:text-main">
          <Like likeState={likeState} onClick={onClick} />
        </div> */}
      </Flex>
    );
  } else {
    return <div />;
  }
};
