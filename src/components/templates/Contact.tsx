import React from 'react';
import { Heading } from '@/components/atoms';
import { Spacer } from '@/components/utilities';
import { useFadeIn } from '@/hooks/useFadeIn';

export const Contact: React.VFC = () => {
  const fadeInStyle = useFadeIn();
  return (
    <div className={fadeInStyle()}>
      <Spacer h={6} />
      <Heading>お問い合わせ</Heading>
    </div>
  );
};
