import React from 'react';

type Props = {
  bold: boolean;
  children: React.ReactNode;
}

export const Heading = ({ bold, children }: Props) => {
  let className = 'text-xl sm:text-3xl md:text-4xl text-center whitespace-pre-wrap';
  if (bold) {
    className += ' font-bold'
  }
  
  return (
    <h1 className={className}>
      {children}
    </h1>
  );
}