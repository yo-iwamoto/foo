import React from 'react';
import { FooterNav } from '../molecules/FooterNav';

export const Footer: React.VFC = () => {
  return (
    <footer className="flex justify-between items-center py-3 px-4 bg-text">
      <FooterNav />
    </footer>
  );
}