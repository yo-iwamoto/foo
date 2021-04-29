import React from "react";
import { Restaurant } from "../../../types";
import { useRouter } from 'next/router';
import { PanelBox } from '../../organisms/PanelBox';

export const SearchResult: React.VFC = () => {
  const router = useRouter();
  const searchText = router.query.word;

  const results = [
    { name: 'カフェ　ロマーノ', description: 'リーズナブル & 本格的な味わい' },
    { name: '飯処 九份', description: 'お手軽台湾料理 ランチは¥500のセットがお得' },
    { name: 'カフェ　ロマーノ', description: 'リーズナブル & 本格的な味わい' },
    { name: '飯処 九份', description: 'お手軽台湾料理 ランチは¥500のセットがお得' },
    { name: 'カフェ　ロマーノ', description: 'リーズナブル & 本格的な味わい' },
    { name: '飯処 九份', description: 'お手軽台湾料理 ランチは¥500のセットがお得' }
  ];

  return (
    <>
      <div className="h-8" />
      <h1 className="text-xl font-bold">「{searchText}」の検索結果</h1>
      <div className="h-8" />
      <div className="mx-4">
        <PanelBox panels={results} />
      </div>
    </>
  );
}