import React, { useEffect } from 'react';
import { Shop, ShopPhoto, ShopUrls } from '../../types';

import { Image } from '../atoms';
import { ExternalLinkIcon } from '../atoms/Icons';
import { Spacer } from '../utilities';

type Props = {
  shop: Shop | undefined;
  like: (id: string) => Promise<void>;
}

export const Card: React.VFC<Props> = ({ shop, like }) => {
  useEffect(() => {

  }, [])

  return (
    <>
      {!shop
        ? <div className="w-full mx-auto p-4 shadow-lg rounded-lg text-left leading-loose">
            <h1 className="font-bold">ピンをクリックして詳細を見ることができます</h1>
          </div>
        : <div className="w-full">
            <a
              href={shop.urls.pc}
              target="_blank"
              className="block w-full md:w-3/5 lg:w-2/5 mx-auto p-4 shadow-lg hover:shadow-md rounded-lg text-left leading-loose cursor-pointer transition-shadow duration-100"
            >
              <div className="w-full flex justify-between items-start">
                <img src={shop.photo.pc.l} className="max-h-40 rounded-lg" />
                <ExternalLinkIcon color="#384044" />
              </div>
              <Spacer h={4} />
              <div className="font-bold">{shop.name}</div>
              <p>{shop.catch}</p>
            </a>
          </div>
      }
    </>
  );
};
