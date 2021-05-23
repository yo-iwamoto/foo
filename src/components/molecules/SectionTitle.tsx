import React from 'react';
import { SubHeading } from '@/components/atoms';
import { Flex, Spacer } from '@/components/utilities';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const SectionTitle: React.VFC<Props> = ({ title, children }) => {
  return (
    <>
      <Flex jBetween aCenter className="px-2">
        <SubHeading bold>{title}</SubHeading>
        {children}
      </Flex>
      <Spacer h={2} />
      <hr />
      <Spacer h={6} />
    </>
  );
};
