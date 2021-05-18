import Image from 'next/image';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Shop, ShopPhoto, ShopUrls } from '../../types';

type Props = {
  shop: Shop | undefined;
}

export const Card: React.VFC<Props> = ({ shop }) => {
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
            >
              <div className="w-full md:w-3/5 lg:w-2/5 mx-auto p-4 shadow-lg hover:shadow-md rounded-lg text-left leading-loose cursor-pointer transition-shadow duration-100">
                <div className="w-full flex justify-between items-start">
                  <img src={shop.photo.pc.l} className="max-h-40" />
                  <FaExternalLinkAlt color="#384044" />
                </div>
                <div className="text-">{shop.name}</div>
                <p>{shop.catch}</p>
              </div>
            </a>
          </div>
      }
    </>
  );
};
