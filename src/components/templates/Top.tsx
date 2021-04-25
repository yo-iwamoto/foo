import React from 'react';
import { SearchBox } from '../organisms/SearchBox';
import Image from 'next/image';

export const Top: React.VFC = () => {
  const text = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう'
  const imageUrl = '/images/meal.png';

  return (
    <>
      <div className="h-8" />
      <h1 className="text-md sm:text-2xl md:text-3xl lg:text-4xl text-center mt-8 whitespace-pre-wrap">
        {text}
      </h1>
      <SearchBox />
      <div className="w-64 mx-auto">
        <Image
          src={imageUrl}
          width={300}
          height={300}
        />
      </div>
    </>
  );
}