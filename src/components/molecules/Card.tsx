import Image from 'next/image';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Shop, ShopPhoto, ShopUrls } from '../../types';

type Props = {
  photo: ShopPhoto;
  name: string;
  urls: ShopUrls;
  catchPhrase: string;
}

export const Card: React.VFC<Props> = ({ photo, name, urls, catchPhrase }) => {
  return (
    <div className="w-full">
      <a
        href={urls.pc}
        target="_blank"
      >
        <div className="w-full mx-auto p-4 shadow-lg hover:shadow-md rounded-lg text-left leading-loose cursor-pointer transition-shadow duration-100">
          <div className="w-full flex justify-between items-start">
            <img src={photo.pc.l} className="max-h-40" />
            <FaExternalLinkAlt color="#384044" />
          </div>
          <div className="text-">{name}</div>
          <p>{catchPhrase}</p>
        </div>
      </a>
    </div>
  );
}
