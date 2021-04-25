import React from 'react';
import { SearchBox } from '../organisms/SearchBox';

export const Top: React.VFC = () => {
  const text = 'ひとりで食事をするお店を探していますか？\nFooでぴったりのお店を見つけましょう'

  return (
    <>
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center mt-8 whitespace-pre-wrap">
        {text}
      </h1>
      <SearchBox />
    </>
  );
}