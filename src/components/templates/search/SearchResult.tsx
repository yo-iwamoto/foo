import React, { useState, useEffect } from "react";
import { Shop } from "../../../types";
import { useRouter } from 'next/router';
import { Card } from "../../atoms/Card";
import { searchWithText } from '../../api/restaurants';
import { ColumnFlexContainer } from '../../molecules/ColumnFlexContainer';
import image from "next/image";
import { RowFlexContainer } from "../../molecules/RowFlexContainer";

export const SearchResult: React.VFC = () => {
  const router = useRouter();
  const searchText = router.query.word as string;
  const [count, setCount] = useState<number>(0);
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    if (searchText) {
      searchWithText(searchText).then(response => {
        setCount(response.results_available);
        setShops(response.shop);
      })
    }
  }, [searchText])

  return (
    <div className="w-full sm:w-10/12 xl:w-3/5 mx-auto">
      <div className="h-8" />
      <RowFlexContainer>
        <h1 className="text-xl font-bold">「{searchText}」の検索結果</h1>
        <h2>検索結果数: {count}</h2>
      </RowFlexContainer>
      <div className="h-8" />
      <div className="mx-4">
        {shops.length !== 0
          ? <ColumnFlexContainer>
              {shops.map((shop, index) => (
                <Card {...shop} catchPhrase={shop.catch} key={index} />
              ))}
            </ColumnFlexContainer>
          : <h1>お店が見つかりませんでした。
            <br/>キーワードを変えてもう一度調べてみましょう。</h1>
        }
      </div>
      <div className="h-16" />
    </div>
  );
}