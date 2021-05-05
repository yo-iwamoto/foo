import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SearchBox } from '../organisms';
import { Vertical6 } from '../utilities';
import firebase from '../../plugins/firebase';

export const Top: React.VFC = () => {
  const text = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう',
        imageUrl = '/images/meal.png';

  const initialStyle = 'opacity-0 translate-y-2 transition-all duration-1000 transform',
        [animationStyle, setAnimationStyle] = useState<string>(initialStyle);

  useEffect(() => {
    setAnimationStyle(animationStyle.replace('opacity-0 translate-y-2', ''));
  }, [animationStyle])

  return (
    <div className={animationStyle}>
      <Vertical6 />
      <h1 className="text-md opacity-100 sm:text-2xl md:text-3xl text-center mt-8 whitespace-pre-wrap">
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
    </div>
  );
}