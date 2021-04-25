import React from 'react';
import { FooterNav } from '../molecules/FooterNav';
import { HotpepperCredit } from '../atoms/HotpepperCredit';

export const Footer: React.VFC = () => {
  return (
    <footer className="flex flex-col pt-3 pb-16 px-4 bg-text">
      <FooterNav />
      <div className="h-4" />
      <HotpepperCredit></HotpepperCredit>
    </footer>
  );
}