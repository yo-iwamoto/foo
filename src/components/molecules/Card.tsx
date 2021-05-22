import React, { useEffect, useState } from 'react';
import { Shop, ShopPhoto, ShopUrls } from '../../types';

import { Image, Like } from '../atoms';
import { ExternalLinkIcon } from '../atoms/Icons';
import { Spacer } from '../utilities';

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
          <a
            className="flex items-center hover:underline"
            target="_blank"
            href={shop.urls.pc}
          >
            <Image
              src={hotpepperImageUrl}
              height={40}
              width={40}
              className="rounded-lg"
            />
          </a>
        </div>
        <Spacer h={4} />
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl">{shop.name}</div>
          <Spacer w={4} />
          <Like likeState={likeState} onClick={onClick} />
        </div>
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
