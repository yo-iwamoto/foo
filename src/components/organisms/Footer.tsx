import React from 'react';
import { FooterNav } from '../molecules/FooterNav';

export const Footer: React.VFC = () => {
  return (
    <footer className="flex flex-col pt-3 pb-16 px-4 bg-text">
      <FooterNav />
      <div className="h-4" />
      <div className="w-24 mx-auto">
        <a href="http://webservice.recruit.co.jp/">
          <img
            src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif"
            alt="ホットペッパー Webサービス"
            width="88"
            height="35"
            title="ホットペッパー Webサービス"
          />
        </a>
      </div>
    </footer>
  );
}