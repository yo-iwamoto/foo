import React from 'react';
import { Heading } from '@/components/atoms';
import { Spacer } from '@/components/utilities';
import { useFadeIn } from '@/hooks/useFadeIn';

export const PrivacyPolicy: React.VFC = () => {
  const [fadeInStyle] = useFadeIn();
  return (
    <div className={fadeInStyle()}>
      <Spacer h={6} />
      <Heading>プライバシーポリシー</Heading>
    </div>
  );
};
