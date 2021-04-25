import React from "react";
import { Restaurant } from "../../../types";
import { useRouter } from 'next/router';

export const Restaurants: React.VFC = () => {
  const router = useRouter();
  const searchText = router.query.word;
  
  const restaurants: Restaurant[] = [
    { name: '叙々苑', description: 'とてもうまいがとても高い！' },
    { name: 'サイゼリア', description: 'とても安いが味はそこそこ！' }
  ];

  return (
    <>
      <div className="h-8" />
      <h1 className="text-xl font-bold">「{searchText}」の検索結果</h1>
      <div className="h-8" />
      <div className="mx-4">
        {restaurants.map((restaurant) => (
          <>
            <div className="border">
              <h2>{restaurant.name}</h2>
              <h3>{restaurant.description}</h3>
            </div>
          </>
        ))}
      </div>
    </>
  );
}