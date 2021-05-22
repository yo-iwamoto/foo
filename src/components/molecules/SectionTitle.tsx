import React from 'react';
import { SubHeading } from '@/components/atoms';
import { Spacer } from '@/components/utilities';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const SectionTitle: React.VFC<Props> = ({ title, children }) => {
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <SubHeading bold>{title}</SubHeading>
        {children}
      </div>
      <Spacer h={2} />
      <hr />
      <Spacer h={6} />
    </>
  );
};
