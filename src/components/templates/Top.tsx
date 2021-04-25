import React, { useEffect } from 'react';
import { SearchBox } from '../organisms/SearchBox';
import Image from 'next/image';

export const Top: React.VFC = () => {
  const text = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう'
  const imageUrl = '/images/meal.png';
  let animationStyles = 'opacity-100 -translate-x-10 transition-all';
  useEffect(() => {
    animationStyles = 'opacity-0';
  });

  return (
    <>
      <div className="h-8" />
      <h1 className="text-md sm:text-2xl md:text-3xl text-center mt-8 whitespace-pre-wrap">
        {text}
      </h1>
      <div className={animationStyles} >
        <SearchBox />
        <div className="w-64 mx-auto">
          <Image
            src={imageUrl}
            width={300}
            height={300}
          />
        </div>
      </div>
    </>
  );
}