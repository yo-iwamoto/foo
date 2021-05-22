import React from 'react';

type Props = {
  bold?: boolean;
  children: React.ReactNode;
};

export const Heading: React.VFC<Props> = ({ bold, children }) => {
  let className = 'text-3xl md:text-4xl text-center whitespace-pre-wrap';
  if (bold) {
    className += ' font-bold';
  }

  return <h1 className={className}>{children}</h1>;
};
