import React, { useState } from 'react';
import { Shop } from '@/types';

import { Image, Like } from '@/components/atoms';
import { Spacer, Flex } from '@/components/utilities';

type Props = {
  shop: Shop | undefined;
  like: (id: string) => Promise<boolean>;
  removeLike: (id: string) => Promise<void>;
};

export const Card: React.VFC<Props> = ({ shop, like, removeLike }) => {
  if (shop) {
    const [likeState, setLikeState] = useState<boolean>(shop.like!);
    const onClick = async (): Promise<void> => {
      if (likeState) {
        removeLike(shop.id);
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
      <div className="w-full mx-auto p-4 shadow-lg rounded-lg text-left leading-loose">
        <div className="w-full flex justify-between items-start">
          <img src={shop.photo.pc.l} className="max-h-40 rounded-lg" />
          <a className="hover:underline" target="_blank" href={shop.urls.pc}>
            <Flex aCenter>
              <Image
                src={hotpepperImageUrl}
                height={40}
                width={40}
                className="rounded-lg"
              />
            </Flex>
          </a>
        </div>
        <Spacer h={4} />
        <Flex jBetween aCenter>
          <div className="font-bold text-xl">{shop.name}</div>
          <Spacer w={4} />
          <Like likeState={likeState} onClick={onClick} />
        </Flex>
        <p>{shop.catch}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full mx-auto p-4 shadow-lg rounded-lg text-left leading-loose">
        <h1 className="font-bold">
          ピンをクリックして詳細を見ることができます
        </h1>
      </div>
    );
  }
};
